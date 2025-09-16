import dynamic from 'next/dynamic'
import Chat from '../components/Chat'


export default function Home() {
return (
<div className="min-h-screen flex items-center justify-center p-6">
<Chat />
</div>
)
}