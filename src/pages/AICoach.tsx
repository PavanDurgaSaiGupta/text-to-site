import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, RefreshCw, Activity } from 'lucide-react';

export const AICoach = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState("Ready to start session");
    const [motionLevel, setMotionLevel] = useState(0);
    const previousFrameRef = useRef<ImageData | null>(null);

    // Motion detection logic
    useEffect(() => {
        let animationId: number;

        const detectMotion = () => {
            if (!isAnalyzing || !webcamRef.current || !canvasRef.current) {
                animationId = requestAnimationFrame(detectMotion);
                return;
            }

            const video = webcamRef.current.video;
            const canvas = canvasRef.current;

            if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) {
                animationId = requestAnimationFrame(detectMotion);
                return;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Set canvas size to match video
            canvas.width = video.videoWidth / 4; // Reduce resolution for performance
            canvas.height = video.videoHeight / 4;

            // Draw current frame
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

            if (previousFrameRef.current) {
                let diffSum = 0;
                const data1 = previousFrameRef.current.data;
                const data2 = currentFrame.data;

                // Calculate pixel differences
                for (let i = 0; i < data1.length; i += 4) {
                    const diff = Math.abs(data1[i] - data2[i]) +
                        Math.abs(data1[i + 1] - data2[i + 1]) +
                        Math.abs(data1[i + 2] - data2[i + 2]);
                    diffSum += diff;
                }

                const avgDiff = diffSum / (canvas.width * canvas.height);
                const motion = Math.min(100, (avgDiff / 10) * 100);
                setMotionLevel(Math.round(motion));

                // Update feedback based on motion
                if (motion > 50) {
                    setFeedback("High activity detected!");
                } else if (motion > 20) {
                    setFeedback("Good movement!");
                } else if (motion > 5) {
                    setFeedback("Slow and steady");
                } else {
                    setFeedback("Hold position");
                }
            }

            previousFrameRef.current = currentFrame;
            animationId = requestAnimationFrame(detectMotion);
        };

        if (isAnalyzing) {
            detectMotion();
        }

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isAnalyzing]);

    const toggleAnalysis = () => {
        setIsAnalyzing(!isAnalyzing);
        if (!isAnalyzing) {
            setFeedback("Analyzing form...");
            previousFrameRef.current = null;
        } else {
            setFeedback("Session paused");
            setMotionLevel(0);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6 animate-slideUp">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-display font-black uppercase tracking-tighter">AI Coach</h1>
                    <p className="text-muted-foreground mt-2">Real-time form analysis and motion tracking</p>
                </div>
                <Button
                    onClick={toggleAnalysis}
                    variant={isAnalyzing ? "destructive" : "default"}
                    className="font-black uppercase tracking-widest"
                >
                    {isAnalyzing ? 'Stop Analysis' : 'Start Session'}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 relative rounded-xl overflow-hidden border-4 border-border bg-black aspect-video">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        className="w-full h-full object-cover"
                        mirrored
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {isAnalyzing && (
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-xs font-mono font-bold animate-pulse">
                                REC • LIVE ANALYSIS
                            </div>
                            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-mono font-bold">
                                MOTION: {motionLevel}%
                            </div>
                            <div className="absolute inset-0 border-2 border-primary/30 m-8 rounded-lg">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <Card className="p-6 border-4 border-border bg-card">
                        <h3 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Camera className="w-5 h-5" />
                            Live Feedback
                        </h3>
                        <div className="h-32 flex items-center justify-center text-center p-4 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/20">
                            <p className={`text-xl font-bold ${isAnalyzing ? 'text-primary animate-pulse' : 'text-muted-foreground'}`}>
                                {feedback}
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 border-4 border-border bg-card">
                        <h3 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Motion Tracker
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-sm">Motion Level</span>
                                <span className="font-mono font-bold text-green-500">{motionLevel}%</span>
                            </div>
                            <div className="w-full bg-muted h-4 rounded-full overflow-hidden border-2 border-border">
                                <div
                                    className="h-full bg-gradient-to-r from-green-500 to-primary transition-all duration-300"
                                    style={{ width: `${motionLevel}%` }}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 border-4 border-border bg-card">
                        <h3 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <RefreshCw className="w-5 h-5" />
                            Stats
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-sm">FPS</span>
                                <span className="font-mono font-bold text-green-500">60</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-sm">Latency</span>
                                <span className="font-mono font-bold text-green-500">12ms</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-mono text-sm">Confidence</span>
                                <span className="font-mono font-bold text-green-500">98%</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
