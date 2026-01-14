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


            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-white/20">
                        Daily Challenge
                    </span>
                    <span className="font-mono text-xs opacity-60">12:44:02 left</span>
                </div>

                <h3 className="text-2xl font-serif mb-2">{dailyProblem.title}</h3>
                <p className="text-white/60 text-sm font-light mb-6 line-clamp-2">
                    {dailyProblem.scenario}
                </p>

                <div className="flex items-center gap-4">
                    <Link
                        to={`/practice/${(dailyProblem.topic || '').toLowerCase()}/${dailyProblem.id}`}
                        className="flex-1 py-3 bg-white text-lux-text rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-center hover:bg-lux-cream transition-colors"
                    >
                        Solve Now
                    </Link>
                    <div className="text-center px-2">
                        <div className="text-lg font-serif">{dailyProblem.difficulty}</div>
                        <div className="text-[9px] uppercase tracking-widest opacity-50">Level</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

