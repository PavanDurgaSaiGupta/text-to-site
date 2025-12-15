import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, GitBranch, Star, ExternalLink } from 'lucide-react';

export const Community = () => {
    const projects = [
        {
            name: "FitNimbus Core",
            description: "The core engine powering the fitness analysis. Written in Rust.",
            stars: 1204,
            forks: 342,
            tags: ["Rust", "WASM", "Computer Vision"]
        },
        {
            name: "Pose-Estimation-JS",
            description: "Lightweight pose estimation library for browser environments.",
            stars: 892,
            forks: 156,
            tags: ["TypeScript", "TensorFlow.js"]
        },
        {
            name: "Gym-UI-Kit",
            description: "Brutalist UI components for fitness applications.",
            stars: 567,
            forks: 89,
            tags: ["React", "Tailwind", "Shadcn"]
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-6 animate-slideUp">
            <div className="text-center mb-16">
                <h1 className="text-6xl font-display font-black uppercase tracking-tighter mb-4 flex items-center justify-center gap-4">
                    <Code className="w-16 h-16" />
                    Open Source Hub
                </h1>
                <p className="text-2xl text-muted-foreground font-bold">Build the future of fitness together.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <Card key={index} className="p-8 border-4 border-border bg-card flex flex-col hover:-translate-y-2 transition-transform shadow-brutal hover:shadow-brutal-hover">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <GitBranch className="w-8 h-8 text-primary" />
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 text-sm font-mono font-bold">
                                    <Star className="w-4 h-4" /> {project.stars}
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-black uppercase tracking-wide mb-4">{project.name}</h3>
                        <p className="text-muted-foreground font-medium mb-6 flex-1">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-muted text-xs font-mono font-bold uppercase rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <Button className="w-full font-black uppercase tracking-widest gap-2">
                            View Repository <ExternalLink className="w-4 h-4" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};
