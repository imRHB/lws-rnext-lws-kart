"use client";

export default function InvoiceNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-2 max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-red-400 md:text-5xl">
                404
            </h2>
            <h4 className="text-lg font-bold md:text-xl text-zinc-800">
                Invoice not found!
            </h4>
            <p className="font-semibold text-center text-zinc-700">
                Unfortunately, invoice not found or you have no access!
            </p>
        </div>
    );
}
