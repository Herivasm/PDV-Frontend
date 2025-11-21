export default function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-3xl text-blue-700 my-10 font-bold">{children}</h1>
    )
}