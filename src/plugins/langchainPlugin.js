// LangChain 插件集成示例
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { ConversationChain } = require('langchain/chains');

module.exports = function langchainPlugin(options = {}) {
  const { apiKey, model = 'gpt-3.5-turbo' } = options;
  if (!apiKey) throw new Error('LangChain 插件需要 OpenAI API Key');

  const chat = new ChatOpenAI({ openAIApiKey: apiKey, modelName: model });
  const chain = new ConversationChain({ llm: chat });

  return {
    name: 'langchainPlugin',
    async chat(messages) {
      // messages: [{role: 'user', content: '...'}]
      const res = await chain.call({ input: messages.map(m => m.content).join('\n') });
      return res.response;
    }
  };
};
