import os
from flask import Blueprint, request, jsonify, Response, stream_with_context
from openai import OpenAI
from dotenv import load_dotenv
import json
import os

# Load environment variables
load_dotenv()

chat_bp = Blueprint('chat', __name__)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@chat_bp.route('/chat', methods=['POST'])
def chat():
    """
    Handle chat requests with streaming support
    """
    try:
        data = request.get_json()
        messages = data.get('messages', [])
        model = data.get('model', 'gpt-4.1-mini')  # Use gpt-4.1-mini as default
        stream = data.get('stream', True)
        
        if not messages:
            return jsonify({'error': 'No messages provided'}), 400
        
        if stream:
            def generate():
                try:
                    response = client.chat.completions.create(
                        model=model,
                        messages=messages,
                        stream=True,
                        temperature=0.7,
                        max_tokens=2000
                    )
                    
                    for chunk in response:
                        if chunk.choices[0].delta.content:
                            content = chunk.choices[0].delta.content
                            yield f"data: {json.dumps({'content': content})}\n\n"
                    
                    yield "data: [DONE]\n\n"
                except Exception as e:
                    yield f"data: {json.dumps({'error': str(e)})}\n\n"
            
            return Response(
                stream_with_context(generate()),
                mimetype='text/event-stream',
                headers={
                    'Cache-Control': 'no-cache',
                    'X-Accel-Buffering': 'no'
                }
            )
        else:
            # Non-streaming response
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.7,
                max_tokens=2000
            )
            
            return jsonify({
                'content': response.choices[0].message.content,
                'model': model,
                'usage': {
                    'prompt_tokens': response.usage.prompt_tokens,
                    'completion_tokens': response.usage.completion_tokens,
                    'total_tokens': response.usage.total_tokens
                }
            })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@chat_bp.route('/chat/deepseek', methods=['POST'])
def chat_deepseek():
    """
    Handle chat requests using DeepSeek model for reasoning tasks
    """
    try:
        data = request.get_json()
        messages = data.get('messages', [])
        stream = data.get('stream', True)
        
        if not messages:
            return jsonify({'error': 'No messages provided'}), 400
        
        # Initialize DeepSeek client with separate API key
        deepseek_api_key = os.getenv('DEEPSEEK_API_KEY')
        if not deepseek_api_key:
            return jsonify({'error': 'DeepSeek API key not configured'}), 500
        
        deepseek_client = OpenAI(
            api_key=deepseek_api_key,
            base_url="https://api.deepseek.com"
        )
        
        model = 'deepseek-reasoner'  # DeepSeek reasoning model
        
        if stream:
            def generate():
                try:
                    response = client.chat.completions.create(
                        model=model,
                        messages=messages,
                        stream=True,
                        temperature=0.7,
                        max_tokens=2000
                    )
                    
                    for chunk in response:
                        if chunk.choices[0].delta.content:
                            content = chunk.choices[0].delta.content
                            yield f"data: {json.dumps({'content': content})}\n\n"
                    
                    yield "data: [DONE]\n\n"
                except Exception as e:
                    yield f"data: {json.dumps({'error': str(e)})}\n\n"
            
            return Response(
                stream_with_context(generate()),
                mimetype='text/event-stream',
                headers={
                    'Cache-Control': 'no-cache',
                    'X-Accel-Buffering': 'no'
                }
            )
        else:
            response = deepseek_client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.7,
                max_tokens=2000
            )
            
            return jsonify({
                'content': response.choices[0].message.content,
                'model': model,
                'usage': {
                    'prompt_tokens': response.usage.prompt_tokens,
                    'completion_tokens': response.usage.completion_tokens,
                    'total_tokens': response.usage.total_tokens
                }
            })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@chat_bp.route('/models', methods=['GET'])
def list_models():
    """
    List available models
    """
    try:
        models = client.models.list()
        return jsonify({
            'models': [
                {
                    'id': model.id,
                    'created': model.created,
                    'owned_by': model.owned_by
                }
                for model in models.data
            ]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
