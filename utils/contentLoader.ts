export type Difficulty = 'Basic' | 'Medium' | 'Hard';
export type QuestionType = 'MCQ' | 'Code';
export type Topic = string; // Dynamic topics

// ... (keep existing interfaces)
export interface Question {
    id: string;
    topic: Topic;
    difficulty: Difficulty;
    title: string;
    scenario: string;
    type: QuestionType;
    options?: string[];
    correctAnswer: string;
    explanation: string;
    companyTags?: string[];
    acceptanceRate?: number;
    content: string; // Full markdown content
}
// ... (keep Chapter, Curriculum interfaces)
export interface StudyMaterial {
    title: string;
    topic: Topic;
    order: number;
    content: string;
}

export interface Chapter {
    id: string;
    title: string;
    description: string;
    file: string;
}

export interface Curriculum {
    topic: string;
    description: string;
    chapters: Chapter[];
}

/**
 * Simple browser-compatible frontmatter parser
 */
function parseMarkdown(content: string): { data: any; content: string } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { data: {}, content };
    }

    const frontmatter = match[1];
    const markdownContent = match[2];

    // Parse YAML-like frontmatter
    const data: any = {};
    const lines = frontmatter.split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.substring(0, colonIndex).trim();
        let value: any = line.substring(colonIndex + 1).trim();

        // Handle arrays [item1, item2]
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value
                .slice(1, -1)
                .split(',')
                .map(v => v.trim());
        }
        // Handle numbers
        else if (!isNaN(Number(value))) {
            value = Number(value);
        }

        data[key] = value;
    }

    return { data, content: markdownContent };
}

// ... (keep helper functions extractOptions, extractCorrectAnswer etc.)
function extractOptions(content: string): string[] | undefined {
    const optionsMatch = content.match(/## Options\n\n((?:- `.+`\n?)+)/);
    if (!optionsMatch) return undefined;

    const optionsText = optionsMatch[1];
    return optionsText
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^- `(.+)`$/, '$1').trim());
}

function extractCorrectAnswer(content: string): string {
    const answerMatch = content.match(/## Correct Answer\n\n```(?:python)?\n(.+?)\n```/s);
    if (answerMatch) {
        return answerMatch[1].trim();
    }
    return '';
}

function extractScenario(content: string): string {
    const scenarioMatch = content.match(/# Scenario\n\n(.+?)(?=\n##)/s);
    if (scenarioMatch) {
        return scenarioMatch[1].trim();
    }
    return '';
}

function extractExplanation(content: string): string {
    const explanationMatch = content.match(/## Explanation\n\n(.+)/s);
    if (explanationMatch) {
        return explanationMatch[1].trim();
    }
    return '';
}

// ... (keep loadProblem)
export async function loadProblem(filePath: string): Promise<Question> {
    try {
        const response = await fetch(filePath);
        const text = await response.text();
        const { data, content } = parseMarkdown(text);

        const scenario = extractScenario(content);
        const options = extractOptions(content);
        const correctAnswer = extractCorrectAnswer(content);
        const explanation = extractExplanation(content);

        return {
            id: data.id,
            topic: data.topic,
            difficulty: data.difficulty,
            title: data.title,
            type: data.type,
            scenario,
            options,
            correctAnswer,
            explanation,
            companyTags: data.companyTags,
            acceptanceRate: data.acceptanceRate,
            content
        };
    } catch (error) {
        console.error(`Error loading problem from ${filePath}:`, error);
        throw error;
    }
}

interface PracticeManifestItem {
    id: string;
    file: string;
    difficulty: Difficulty;
    title: string;
}

interface PracticeManifest {
    topic: string;
    problems: PracticeManifestItem[];
}

/**
 * Load practice manifest for a topic
 */
async function loadPracticeManifest(topic: Topic): Promise<PracticeManifest> {
    const topicLower = topic.toLowerCase().replace(/ /g, '-');
    const filePath = `/content/practice/${topicLower}/practice.json`;

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            return { topic, problems: [] };
        }
        return await response.json();
    } catch (error) {
        console.warn(`Could not load practice manifest for ${topic}:`, error);
        return { topic, problems: [] };
    }
}

/**
 * Load all practice problems for a specific topic and difficulty
 */
export async function loadPracticeProblems(
    topic: Topic,
    difficulty?: Difficulty
): Promise<Question[]> {
    const manifest = await loadPracticeManifest(topic);
    const problems: Question[] = [];
    const topicLower = topic.toLowerCase().replace(/ /g, '-');

    const itemsToLoad = difficulty
        ? manifest.problems.filter(p => p.difficulty === difficulty)
        : manifest.problems;

    for (const item of itemsToLoad) {
        const fullPath = `/content/practice/${topicLower}/${item.file}`;

        try {
            const problem = await loadProblem(fullPath);
            if (item.id) problem.id = item.id;
            problems.push(problem);
        } catch (error) {
            console.warn(`Could not load problem ${fullPath}:`, error);
        }
    }

    return problems;
}

export interface TopicMetadata {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    count: number;
    hasStudyMaterial?: boolean;
}

/**
 * Load all available topics from topics.json
 */
export async function loadTopics(): Promise<TopicMetadata[]> {
    try {
        const response = await fetch('/content/practice/topics.json');
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Failed to load topics:', error);
        return [];
    }
}

/**
 * Load all practice problems (all topics)
 */
export async function loadAllPracticeProblems(): Promise<Question[]> {
    const topicsMeta = await loadTopics();
    const allProblems: Question[] = [];

    for (const meta of topicsMeta) {
        const problems = await loadPracticeProblems(meta.id);
        allProblems.push(...problems);
    }

    return allProblems;
}

/**
 * Get a specific problem by ID
 */
export async function getProblemById(id: string): Promise<Question | null> {
    const allProblems = await loadAllPracticeProblems();
    return allProblems.find(p => p.id === id) || null;
}

/**
 * Load curriculum
 */
export async function loadCurriculum(topic: Topic | string): Promise<Curriculum> {
    const topicLower = topic.toLowerCase().replace(/ /g, '-');
    const filePath = `/content/study/${topicLower}/curriculum.json`;

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load curriculum: ${response.statusText}`);
        }
        const data = await response.json();
        return data as Curriculum;
    } catch (error) {
        console.error(`Error loading curriculum from ${filePath}:`, error);
        throw error;
    }
}

/**
 * Load study material
 */
export async function loadStudyMaterial(topic: Topic | string, fileName: string): Promise<StudyMaterial> {
    const topicLower = topic.toLowerCase().replace(/ /g, '-');
    const filePath = `/content/study/${topicLower}/${fileName}`;

    try {
        const response = await fetch(filePath);
        const text = await response.text();
        const { data, content } = parseMarkdown(text);

        return {
            title: data.title || 'Untitled Chapter',
            topic: (data.topic as Topic) || topic,
            order: data.order || 0,
            content
        };
    } catch (error) {
        console.error(`Error loading study material from ${filePath}:`, error);
        throw error;
    }
}

