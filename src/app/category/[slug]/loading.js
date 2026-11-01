export default function Loading() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
            {/* শিরোনামের কার্ড */}
            <div className="bg-base-100 border border-base-300 rounded-2xl p-4 sm:p-6 flex items-center gap-4">
                <div className="skeleton size-12 sm:size-16 rounded-xl shrink-0" />
                <div className="space-y-2 flex-1">
                    <div className="skeleton h-7 w-32" />
                    <div className="skeleton h-4 w-48 max-w-full" />
                </div>
            </div>

            <div className="bg-base-100 border border-base-300 rounded-2xl p-3 sm:p-4 flex justify-end">
                <div className="skeleton h-8 w-40" />
            </div>

            <div className="skeleton h-4 w-44" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-base-100 border border-base-300 rounded-2xl p-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="skeleton size-12 rounded-xl shrink-0" />
                            <div className="space-y-2 flex-1">
                                <div className="skeleton h-4 w-3/4" />
                                <div className="skeleton h-3 w-1/2" />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="space-y-2">
                                <div className="skeleton h-3 w-16" />
                                <div className="skeleton h-6 w-24" />
                            </div>
                            <div className="skeleton h-6 w-14 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}