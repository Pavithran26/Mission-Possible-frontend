import React, { useState } from 'react';
import { 
  KnowledgeHubTopic, 
  KnowledgeHubChatMessage, 
  User 
} from '../../types';
import { 
  Radio, 
  Search, 
  Send, 
  Smile, 
  Paperclip, 
  Code, 
  AtSign, 
  Sparkles, 
  ThumbsUp, 
  Heart, 
  Flame, 
  Lightbulb, 
  CheckCircle2, 
  Users, 
  Hash, 
  Bot 
} from 'lucide-react';

interface RealtimeTopicChatProps {
  topics: KnowledgeHubTopic[];
  chatMessages: KnowledgeHubChatMessage[];
  currentUser: User;
  onSendMessage: (channelId: string, topicId: string, content: string, codeSnippet?: string) => void;
  onToggleReaction: (messageId: string, emoji: string) => void;
}

export const RealtimeTopicChat: React.FC<RealtimeTopicChatProps> = ({
  topics,
  chatMessages,
  currentUser,
  onSendMessage,
  onToggleReaction
}) => {
  // Selected Channel & Topic
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || 'topic-azure');
  const [selectedChannelId, setSelectedChannelId] = useState<string>(topics[0]?.channels[0]?.id || 'chan-azure-gen');

  // Input States
  const [messageText, setMessageText] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [chatSearch, setChatSearch] = useState('');

  const activeTopic = topics.find(t => t.id === selectedTopicId) || topics[0];
  const activeChannel = activeTopic?.channels.find(c => c.id === selectedChannelId) || activeTopic?.channels[0];

  const channelMessages = chatMessages.filter(m => m.channelId === activeChannel?.id && 
    (chatSearch ? m.content.toLowerCase().includes(chatSearch.toLowerCase()) : true)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChannel) return;

    onSendMessage(
      activeChannel.id,
      activeTopic.id,
      messageText,
      codeSnippet || undefined
    );

    setMessageText('');
    setCodeSnippet('');
    setShowCodeInput(false);
  };

  const availableEmojis = ['👍', '❤️', '🚀', '💡', '👏'];

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-4 min-h-[600px] shadow-xl text-slate-900 animate-fadeIn">
      
      {/* Left Channel Sidebar (Teams Style) */}
      <div className="bg-slate-50/80 backdrop-blur-md border-r border-slate-200/80 p-4 space-y-5 overflow-y-auto max-h-[600px]">
        
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs pb-3 border-b border-slate-200/80">
          <Radio className="w-4 h-4 text-amber-500" />
          <span>Teams Channels</span>
        </div>

        {/* Topic Channel Accordion List */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="space-y-1">
              <div
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  if (topic.channels[0]) setSelectedChannelId(topic.channels[0].id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center justify-between ${
                  selectedTopicId === topic.id ? 'text-blue-700 bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{topic.name}</span>
                <span className="text-[10px] font-mono text-slate-500">({topic.channels.length})</span>
              </div>

              {/* Sub Channels */}
              {selectedTopicId === topic.id && (
                <div className="pl-3 space-y-1 pt-1 border-l border-slate-200/80 ml-2">
                  {topic.channels.map((chan) => (
                    <button
                      key={chan.id}
                      onClick={() => setSelectedChannelId(chan.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-2 ${
                        selectedChannelId === chan.id 
                          ? 'bg-blue-600 text-white font-bold shadow-md' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{chan.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Main Chat Feed Area */}
      <div className="md:col-span-3 flex flex-col justify-between bg-white/40 backdrop-blur-md h-[600px]">
        
        {/* Chat Header */}
        <div className="p-4 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">{activeChannel?.name || 'General'}</h3>
              <span className="text-xs text-slate-500 font-mono">({activeTopic?.name} Hub)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">{activeChannel?.description}</p>
          </div>

          {/* Search Chat Bar */}
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              placeholder="Search chat messages..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* Chat Messages Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {channelMessages.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-slate-500">
              <Radio className="w-8 h-8 mx-auto text-slate-400" />
              <p className="text-xs font-bold">This channel is quiet. Start the conversation!</p>
            </div>
          ) : (
            channelMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-2xl border space-y-2 transition-all shadow-sm ${
                  msg.isAiGenerated 
                    ? 'bg-violet-50/90 border-violet-200/80' 
                    : 'bg-white/90 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {msg.isAiGenerated ? (
                      <Bot className="w-4 h-4 text-violet-600" />
                    ) : (
                      <img src={msg.authorAvatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"} alt="Avatar" className="w-5 h-5 rounded-full border border-slate-200" />
                    )}
                    <span className={`font-bold ${msg.isAiGenerated ? 'text-violet-700' : 'text-slate-900'}`}>
                      {msg.authorName}
                    </span>
                    <span className="text-[10px] text-slate-500">({msg.authorRole})</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed">
                  {msg.content}
                </p>

                {msg.codeSnippet && (
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <pre>{msg.codeSnippet}</pre>
                  </div>
                )}

                {/* Emoji Reactions Row */}
                <div className="flex items-center gap-1.5 pt-1">
                  {availableEmojis.map(emoji => {
                    const reaction = msg.reactions.find(r => r.emoji === emoji);
                    return (
                      <button
                        key={emoji}
                        onClick={() => onToggleReaction(msg.id, emoji)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] border transition-all flex items-center gap-1 ${
                          reaction?.users.includes(currentUser.id)
                            ? 'bg-blue-100 border-blue-300 text-blue-700 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <span>{emoji}</span>
                        {reaction && <span>{reaction.count}</span>}
                      </button>
                    );
                  })}
                </div>

              </div>
            ))
          )}
        </div>

        {/* Input Send Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white/90 backdrop-blur-md border-t border-slate-200/80 space-y-3">
          
          {showCodeInput && (
            <textarea
              rows={2}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              placeholder="Paste code snippet..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 font-mono text-xs text-emerald-400 focus:outline-none"
            />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCodeInput(!showCodeInput)}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors"
              title="Add Code Snippet"
            >
              <Code className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Message #${activeChannel?.name || 'general'}... (@mentions supported)`}
              className="flex-1 bg-white border border-slate-200 text-xs rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-sm"
            />

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
