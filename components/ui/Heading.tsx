export default function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-3xl my-10">{children}</h1>
    )
}