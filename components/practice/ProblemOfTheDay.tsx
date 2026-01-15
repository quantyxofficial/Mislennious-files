import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { loadAllPracticeProblems, Question } from '../../utils/contentLoader';

export const ProblemOfTheDay: React.FC = () => {
    const [dailyProblem, setDailyProblem] = useState<Question | null>(null);

    useEffect(() => {
        const loadDailyProblem = async () => {
            try {
                const allProblems = await loadAllPracticeProblems();
                if (allProblems.length > 0) {
                    // Select a random problem (in production, you'd use a date-based seed)
                    const randomIndex = Math.floor(Math.random() * allProblems.length);
                    setDailyProblem(allProblems[randomIndex]);
                }
            } catch (error) {
                console.error('Error loading daily problem:', error);
            }
        };

        loadDailyProblem();
    }, []);

    if (!dailyProblem) {
        return null;
    }

    return (
        <div className="relative overflow-hidden bg-lux-text text-white rounded-3xl p-8 shadow-xl">
            {/* Subtle Gradient Overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 flex items-center gap-2 border border-amber-500/20 px-3 py-1 rounded-full bg-amber-500/10">
                        Daily Challenge
                    </span>
                    <span className="font-mono text-xs text-white/40">12:44:02 left</span>
                </div>

                <h3 className="text-2xl font-serif mb-2 text-white">{dailyProblem.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-2 font-light">
                    {dailyProblem.scenario}
                </p>

                <div className="flex items-center gap-4">
                    <Link
                        to={`/practice/${(dailyProblem.topic || '').toLowerCase()}/${dailyProblem.id}`}
                        className="flex-1 py-3 bg-white text-lux-text rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-center hover:bg-lux-cream transition-colors shadow-lg"
                    >
                        Solve Now
                    </Link>
                    <div className="text-center px-4">
                        <div className="text-lg font-serif text-white">{dailyProblem.difficulty}</div>
                        <div className="text-[9px] uppercase tracking-widest text-white/40">Level</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

