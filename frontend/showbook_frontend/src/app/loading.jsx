export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0b0c0f] text-white">
            <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2a2c31] border-t-[#f84464]" />
                </div>
            </div>
        </div>
    )
}