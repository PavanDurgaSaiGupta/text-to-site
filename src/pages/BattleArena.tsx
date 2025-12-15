import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Swords, Medal } from 'lucide-react';

export const BattleArena = () => {
    const leaderboard = [
        { rank: 1, name: "CyberLifter99", points: 12500, avatar: "CL" },
        { rank: 2, name: "NeonGains", points: 11200, avatar: "NG" },
        { rank: 3, name: "PixelPump", points: 10800, avatar: "PP" },
        { rank: 4, name: "RetroFit", points: 9500, avatar: "RF" },
        { rank: 5, name: "GlitchMuscle", points: 8900, avatar: "GM" },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-6 animate-slideUp">
            <div className="text-center mb-12">
                <h1 className="text-6xl font-display font-black uppercase tracking-tighter mb-4 flex items-center justify-center gap-4">
                    <Swords className="w-16 h-16" />
                    Battle Arena
                </h1>
                <p className="text-2xl text-muted-foreground font-bold">Global Leaderboard</p>
            </div>

            <div className="grid gap-4 max-w-3xl mx-auto">
                {leaderboard.map((user) => (
                    <Card key={user.rank} className="p-6 border-4 border-border bg-card hover:scale-105 transition-transform cursor-pointer group">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 flex items-center justify-center font-black text-3xl italic text-muted-foreground group-hover:text-primary transition-colors">
                                #{user.rank}
                            </div>

                            <Avatar className="w-16 h-16 border-4 border-border">
                                <AvatarFallback className="font-black bg-accent text-accent-foreground">{user.avatar}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <h3 className="text-2xl font-black uppercase tracking-wide">{user.name}</h3>
                                <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                                    <span>LEVEL 42</span>
                                    <span>•</span>
                                    <span>WARRIOR CLASS</span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-3xl font-black text-primary">{user.points.toLocaleString()}</div>
                                <div className="text-xs font-mono uppercase tracking-widest opacity-70">XP Points</div>
                            </div>

                            {user.rank <= 3 && (
                                <Trophy className={`w-8 h-8 ${user.rank === 1 ? 'text-yellow-500' :
                                        user.rank === 2 ? 'text-gray-400' :
                                            'text-amber-700'
                                    }`} />
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
