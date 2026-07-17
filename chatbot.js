/**
 * PortfolioChatbot Engine
 * Encapsulates resume intelligence data, natural language intent processing,
 * and interface state rendering for Sai Dari's portfolio.
 */
export default class PortfolioChatbot {
    constructor(config = {}) {
        this.feed = document.getElementById(config.feedId || 'chat-feed');
        this.input = document.getElementById(config.inputId || 'chat-input');
        this.submitBtn = document.getElementById(config.submitBtnId || 'chat-submit');
        this.chipContainer = document.getElementById(config.chipContainerId || 'chip-container');
        
        // Knowledge base derived directly from historical telemetry metrics and professional background[cite: 1]
        this.knowledgeBase = {
            agentic: "Sai handled multi-agent system execution across LangChain & AutoGen frameworks at Walmart, configuring 6 specialized operational sub-agents governed by automated tool schemas and automated retry/repair validation execution loops[cite: 1].",
            rag: "Sai engineered robust enterprise RAG workflows at Blue Cross Blue Shield over 10K+ clinical text arrays, decreasing internal documentation lookup search delays by 11 seconds[cite: 1]. At Walmart, his designs parsed 1K+ technical manuals across 8K-10K daily user interactions[cite: 1].",
            contact: "Sai can be reached immediately for screenings via email at sailypally98@gmail.com or via telephone line text routing at +1 (206) 451-8426[cite: 1].",
            certifications: "Sai holds multiple elite cloud certifications including AWS Certified Machine Learning Engineer, Databricks Generative AI Engineer, and NVIDIA Generative AI LLMs[cite: 1].",
            default: "Thanks for checking out Sai's profile. I've logged that intent. You can find deep experience mappings across production systems at Walmart and BCBS listed directly in the timeline metrics on this page![cite: 1]"
        };
    }

    /**
     * Boot up the chatbot runtime and register listeners
     */
    init() {
        if (!this.feed || !this.input) {
            console.error("Chatbot initialization failed: Required DOM endpoints missing.");
            return;
        }
        this.registerEvents();
    }

    registerEvents() {
        // Text entry events
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.handleUserMessage();
        });
        if (this.submitBtn) {
            this.submitBtn.addEventListener('click', () => this.handleUserMessage());
        }

        // Programmatic micro-interaction chip bindings
        if (this.chipContainer) {
            this.chipContainer.addEventListener('click', (e) => {
                const targetChip = e.target.closest('[data-chip]');
                if (targetChip) {
                    const intentKey = targetChip.getAttribute('data-chip');
                    const chipText = targetChip.textContent.trim();
                    this.executeStream(chipText, intentKey);
                }
            });
        }
    }

    appendMessage(text, isUser = false) {
        const block = document.createElement("div");
        block.className = isUser 
            ? "bg-indigo-600 text-white p-3 rounded-xl max-w-[85%] self-end leading-relaxed shadow-sm" 
            : "bg-zinc-900 text-zinc-300 p-3 rounded-xl max-w-[85%] self-start border border-zinc-800/60 leading-relaxed";
        block.textContent = text;
        
        this.feed.appendChild(block);
        this.feed.scrollTop = this.feed.scrollHeight;
    }

    executeStream(visibleText, intentKey) {
        this.appendMessage(visibleText, true);
        setTimeout(() => {
            const answer = this.knowledgeBase[intentKey] || this.knowledgeBase.default;
            this.appendMessage(answer);
        }, 350);
    }

    handleUserMessage() {
        const promptText = this.input.value.trim();
        if (!promptText) return;

        this.appendMessage(promptText, true);
        this.input.value = "";

        const cleanToken = promptText.toLowerCase();
        let matchedIntent = "default";

        // Deterministic keyword classification matrix
        if (cleanToken.includes("agent") || cleanToken.includes("autogen") || cleanToken.includes("multi")) {
            matchedIntent = "agentic";
        } else if (cleanToken.includes("rag") || cleanToken.includes("vector") || cleanToken.includes("embed") || cleanToken.includes("data")) {
            matchedIntent = "rag";
        } else if (cleanToken.includes("phone") || cleanToken.includes("email") || cleanToken.includes("contact") || cleanToken.includes("call")) {
            matchedIntent = "contact";
        } else if (cleanToken.includes("cert") || cleanToken.includes("aws") || cleanToken.includes("nvidia")) {
            matchedIntent = "certifications";
        }

        setTimeout(() => {
            const outputText = this.knowledgeBase[matchedIntent];
            this.appendMessage(outputText);
        }, 400);
    }
}
