import type { AIModel, ModelPromptResponse } from "@/types/model"

const MOCK_MODELS: AIModel[] = [
  {
    id: "1",
    title: "LegalSummarizer Pro",
    description:
      "Understanding complex legal documents is a challenge for professionals and laypeople alike. Legal documents are often filled with jargon, archaic language, and convoluted sentence structures that obscure the core meaning. LegalSummarizer Pro is designed to bridge this gap.\n\nBuilt on top of a fine-tuned Transformer architecture trained on millions of case files, contracts, and statutes, this model excels at extracting key clauses, identifying obligations, and summarizing arguments into plain English. It's not just a summarizer; it's a legal assistant that understands context.\n\nWhether you are a lawyer looking to quickly digest a case brief or a business owner trying to understand a contract, LegalSummarizer Pro delivers accuracy and clarity. It handles various document types including NDAs, employment contracts, and court rulings with high fidelity.",
    provider: "LegalTech AI",
    tags: ["Legal", "NLP", "Summary"],
    price: 0.05,
    imageUrl:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Plain English summaries of complex legalese",
      "Clause extraction and highlighting",
      "Risk assessment flagging",
      "Support for multiple jurisdictions",
    ],
    inputType: "PDF, TXT, DOCX",
    outputType: "Summary Text, JSON",
    versions: [
      {
        id: "v1-1",
        name: "v1.2.0-stable",
        script: "def summarize(text): return 'legal summary'",
        createdAt: "2024-01-10T10:00:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "MediDiagnose Assist",
    description:
      "In the fast-paced world of healthcare, second opinions and preliminary diagnostics are invaluable tools. MediDiagnose Assist works as a decision-support system for healthcare professionals. By analyzing patient symptoms, medical history, and vital signs, it suggests potential diagnoses and recommends further tests.\n\nThe model is trained on a vast dataset of anonymized medical records and peer-reviewed literature. It utilizes probabilistic modeling to rank potential conditions by likelihood, helping doctors narrow down possibilities faster. Note: This tool is intended for assistance only and does not replace professional medical judgment.\n\nKey capabilities include symptom analysis, drug interaction checking, and reference to relevant medical guidelines.",
    provider: "HealthAI Labs",
    tags: ["Healthcare", "Diagnosis", "Medical"],
    price: 0.1,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Symptom-based differential diagnosis",
      "Drug interaction alerts",
      "Integration with ICD-10 coding",
      "Reference to latest clinical guidelines",
    ],
    inputType: "Medical Records, Symptoms CSV",
    outputType: "Diagnosis Probability Map",
    versions: [
      {
        id: "v1-2",
        name: "v2.0.4",
        script: "def diagnose(data): return 'health report'",
        createdAt: "2024-01-12T08:30:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "CodeOptimzr",
    description:
      "Inefficient code can lead to higher cloud costs, slower application response times, and poor user experience. CodeOptimzr is an intelligent refactoring tool that doesn't just format your code—it makes it faster and more readable.\n\nUsing advanced static analysis combined with deep learning, CodeOptimzr identifies bottlenecks, redundant loops, and memory leaks in Python and JavaScript applications. It suggests refactored code blocks that maintain the original logic while improving time and space complexity.\n\nPerfect for legacy codebases or quick code reviews, it helps developers adhere to best practices without the manual overhead.",
    provider: "DevTools Inc",
    tags: ["Coding", "Optimization", "Developer Tools"],
    price: 0.02,
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Complexity analysis (Big O estimation)",
      "Automated refactoring suggestions",
      "Memory leak detection",
      "Security vulnerability patching",
    ],
    inputType: "Python, JS, C++ Files",
    outputType: "Refactored Code, PDF Report",
    versions: [
      {
        id: "v1-3",
        name: "v0.9.1-beta",
        script: "def optimize(code): return 'faster code'",
        createdAt: "2024-01-15T14:20:00Z",
      },
    ],
  },
  {
    id: "4",
    title: "CreativeWriter 3000",
    description:
      "Writer's block is a thing of the past with CreativeWriter 3000. Designed for authors, screenwriters, and content creators, this model specializes in narrative generation. Unlike generic text generators, it understands plot arcs, character development, and distinct tones of voice.\n\nYou can feed it a character sketch and a setting, and it will generate a scene. Or prompt it with a plot twist, and it will write the leading chapters. It supports various genres from Sci-Fi to Romance, adapting its style to fit the narrative needs.\n\nDeeply creative and surprisingly human-like, CreativeWriter 3000 is your co-author that never sleeps.",
    provider: "Creative AI",
    tags: ["Writing", "Creative", "NLP"],
    price: 0.03,
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Plot arc generation",
      "Character dialogue variations",
      "Genre-specific tone adaptation",
      "Long-form story continuation",
    ],
    inputType: "Character Prompt, Plot Outline",
    outputType: "Creative Narrative",
    versions: [
      {
        id: "v1-4",
        name: "v3.0.0",
        script: "def write(prompt): return 'novel'",
        createdAt: "2024-01-16T11:45:00Z",
      },
    ],
  },
  {
    id: "5",
    title: "FinForecast Elite",
    description:
      "Financial markets are volatile and complex. FinForecast Elite leverages temporal fusion transformers to predict market trends and analyze financial statements with high accuracy. It ingests real-time market data, news sentiment, and historical reports to provide actionable insights.\n\nWhether you are analyzing a single stock's performance or assessing macroeconomic trends, FinForecast Elite breaks down the data into understandable metrics. It can parse quarterly earnings reports in seconds, highlighting growth risks and opportunities.\n\nTrusted by financial analysts for its robust data processing and clear visualization of potential market movements.",
    provider: "FinTech Sol",
    tags: ["Finance", "Prediction", "Analytics"],
    price: 0.15,
    imageUrl:
      "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Real-time sentiment interpretation",
      "Quarterly report parsing",
      "Trend forecasting charts",
      "Portfolio risk assessment",
    ],
    inputType: "Market Data (Tickers), JSON",
    outputType: "CSV Predictions, Forecast Charts",
    versions: [
      {
        id: "v1-5",
        name: "v1.5.2",
        script: "def forecast(data): return 'market prediction'",
        createdAt: "2024-01-18T09:10:00Z",
      },
    ],
  },
  {
    id: "6",
    title: "VoiceCloner X",
    description:
      "VoiceCloner X represents the cutting edge of audio synthesis technology. With just a few seconds of reference audio, it can construct a full digital voice profile that sounds indistinguishable from the original speaker. This tech is revolutionizing content creation, allowing podcasters to edit audio by typing and game developers to voiced characters dynamically.\n\nThe model works by analyzing vocal characteristics such as pitch, timbre, and cadence. It supports multi-lingual synthesis, meaning you can speak in English and have your cloned voice output fluent Spanish or Japanese.\n\nEthically designed with watermark technologies to prevent misuse, VoiceCloner X empowers creators to scale their audio production.",
    provider: "AudioMagic",
    tags: ["Audio", "TTS", "Cloning"],
    price: 0.08,
    imageUrl:
      "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Instant voice cloning (3s reference)",
      "Cross-lingual voice transfer",
      "Emotion control (Happy, Sad, Angry)",
      "high-fidelity 48kHz output",
    ],
    inputType: "Audio (MP3/WAV/OGG)",
    outputType: "Synthesized Audio, Voice Profile",
    versions: [
      {
        id: "v1-6",
        name: "v4.1.0",
        script: "def clone(audio): return 'voice'",
        createdAt: "2024-01-19T13:00:00Z",
      },
    ],
  },
  {
    id: "7",
    title: "ImageRestorer AI",
    description:
      "Preserve your memories with ImageRestorer AI. This computer vision model specializes in restoring old, damaged, or low-resolution photographs. It can remove scratches, colorize black and white images, and upscale blurry photos into crisp, high-definition masterpieces.\n\nUsing Generative Adversarial Networks (GANs), it hallucinates plausible details to fill in missing information while respecting the original context of the image. It's perfect for archivists, photographers, and families looking to save their physical photo collections.\n\nSimply upload a scan of a damaged photo, and watch as creases disappear and colors return to life.",
    provider: "Visionary Tech",
    tags: ["Image", "Restoration", "Computer Vision"],
    price: 0.04,
    imageUrl:
      "https://images.unsplash.com/photo-1505739998589-00fc191ce01d?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Scratch and dust removal",
      "Automatic colorization",
      "Face enhancement",
      "4x Super-resolution upscaling",
    ],
    inputType: "Image (JPEG, PNG)",
    outputType: "Enhanced Image",
    versions: [
      {
        id: "v1-7",
        name: "v2.3.0",
        script: "def restore(img): return 'better image'",
        createdAt: "2024-01-20T16:00:00Z",
      },
    ],
  },
  {
    id: "8",
    title: "SentimentAnalyze",
    description:
      "Understanding public perception is key to brand management. SentimentAnalyze offers real-time monitoring of social media, news, and reviews to gauge public sentiment toward your brand or topic. It goes beyond simple positive/negative classification to detect specific emotions like anger, joy, surprise, or trust.\n\nIdeal for marketing teams and crisis management, it processes thousands of posts per second to alert you of viral trends before they peak. The dashboard provides a visual heat map of sentiment changes over time.\n\nStay ahead of the narrative with deep insights into what the world is feeling about your products.",
    provider: "DataSense",
    tags: ["Social Media", "Analytics", "NLP"],
    price: 0.01,
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Granular emotion detection",
      "Real-time trend alerts",
      "Competitor sentiment benchmarking",
      "Multi-platform aggregation",
    ],
    inputType: "Twitter Handle, URL, Text",
    outputType: "Sentiment Heatmap, JSON Report",
    versions: [
      {
        id: "v1-8",
        name: "v1.0.0",
        script: "def analyze(text): return 'sentiment'",
        createdAt: "2024-01-21T10:00:00Z",
      },
    ],
  },
  {
    id: "9",
    title: "CyberGuard Threat",
    description:
      "In an era of sophisticated cyber attacks, reactive security is not enough. CyberGuard Threat is a proactive threat detection system that uses anomaly detection to identify potential breaches before they cause damage. It learns the normal behavior patterns of your network and users to flag deviations.\n\nIt can detect zero-day exploits, insider threats, and subtle data exfiltration attempts that traditional firewalls miss. The model continuously updates its threat definitions based on global attack vectors.\n\nSecure your infrastructure with an AI that never sleeps and adapts to the evolving threat landscape.",
    provider: "SecurNet",
    tags: ["Security", "Detection", "Cyber"],
    price: 0.12,
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Zero-day exploit detection",
      "User behavior analytics (UBA)",
      "Automated incident response",
      "Real-time traffic analysis",
    ],
    inputType: "Network Logs (Syslog, PCAP)",
    outputType: "Alert Stream, PDF Summary",
    versions: [
      {
        id: "v1-9",
        name: "v0.5.0-dev",
        script: "def detect(logs): return 'threats'",
        createdAt: "2024-01-22T14:00:00Z",
      },
    ],
  },
  {
    id: "10",
    title: "EduTutor Bot",
    description:
      "Education should be personalized, but one-on-one tutoring is expensive. EduTutor Bot democratizes access to quality education by acting as a personal tutor for K-12 subjects. It adapts its teaching style to the student's learning pace, offering hints and explanations rather than just answers.\n\nFrom explaining calculus concepts to proofreading history essays, EduTutor Bot covers a wide curriculum. It uses Socratic questioning to encourage critical thinking and retention.\n\nIntegrated with standard curriculums, it tracks student progress and highlights areas that need more practice.",
    provider: "EdTech Global",
    tags: ["Education", "Tutoring", "Chatbot"],
    price: 0.02,
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Adaptive learning paths",
      "Homework assistance",
      "Concept visualization",
      "Progress tracking dashboard",
    ],
    inputType: "Subject Name, Prompt",
    outputType: "Interactive Tutorial",
    versions: [
      {
        id: "v1-10",
        name: "v1.1.0",
        script: "def teach(subject): return 'lesson'",
        createdAt: "2024-01-23T09:00:00Z",
      },
    ],
  },
  {
    id: "11",
    title: "ArchitectDesign Gen",
    description:
      "ArchitectDesign Gen is a tool for visionaries. It transforms text descriptions and rough sketches into detailed architectural floor plans and 3D mockups. Architects and interior designers can use it to rapidly iterate on ideas and present concepts to clients.\n\nThe model understands spatial relationships, building codes, and aesthetic styles. Ask for a 'modern minimalist kitchen with an island' or a 'functional open-plan office', and receive a high-fidelity rendering in minutes.\n\nStreamline the concept phase of design and bring your spatial ideas to life instantly.",
    provider: "StructAI",
    tags: ["Architecture", "Design", "3D"],
    price: 0.25,
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Text-to-3D rendering",
      "Floor plan generation",
      "Style transfer",
      "Lighting simulation",
    ],
    inputType: "Sketch (JPG), Text Prompt",
    outputType: "OBJ/FBX Files, High-Res Map",
    versions: [
      {
        id: "v1-11",
        name: "v1.0.1",
        script: "def build(sketch): return '3d model'",
        createdAt: "2024-01-24T16:00:00Z",
      },
    ],
  },
  {
    id: "12",
    title: "MusicComposer Pro",
    description:
      "Need original music but don't have a background in composition? MusicComposer Pro generates royalty-free background music tailored to your specific mood, genre, and duration needs. It is perfect for video creators, game developers, and podcasters.\n\nUnlike loop-based tools, this model composes note-by-note, ensuring a unique piece every time. You can control the instrumentation, tempo, and emotional intensity of the track.\n\nCreate the perfect soundtrack for your project in seconds, without worrying about copyright strikes.",
    provider: "SonicWaves",
    tags: ["Music", "Audio", "Generation"],
    price: 0.1,
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Genre-specific composition",
      "Adjustable loop duration",
      "Multi-instrument arrangement",
      "MIDI export support",
    ],
    inputType: "Genre, BPM, Mood Tags",
    outputType: "MIDI, WAV (Streaming)",
    versions: [
      {
        id: "v1-12",
        name: "v5.5.0-pro",
        script: "def compose(params): return 'music file'",
        createdAt: "2024-01-25T11:00:00Z",
      },
    ],
  },
]

export const modelService = {
  async getAllModels(
    search?: string,
    page: number = 1,
    limit: number = 6
  ): Promise<{ data: AIModel[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate latency

    let filteredModels = MOCK_MODELS
    if (search) {
      filteredModels = MOCK_MODELS.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    const start = (page - 1) * limit
    const end = start + limit
    const paginatedModels = filteredModels.slice(start, end)

    return {
      data: paginatedModels,
      total: filteredModels.length,
    }
  },

  async getModelById(id: string): Promise<AIModel> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const model = MOCK_MODELS.find((m) => m.id === id)
    if (!model) throw new Error("Model not found")
    return model
  },

  async getMyModels(): Promise<AIModel[]> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return [MOCK_MODELS[0], MOCK_MODELS[2]] // Return a subset as "my models"
  },

  async runInference(
    modelId: string,
    prompt: string
  ): Promise<ModelPromptResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate processing
    return {
      answer: `[Mock Inference Output for ${modelId}]\n\nBased on your prompt: "${prompt}"\n\nThis is a simulated response generated by the frontend mock service. In a real application, this would be the result of a complex AI model processing your input.`,
    }
  },
}
