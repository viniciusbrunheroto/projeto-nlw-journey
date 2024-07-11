import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Link {
    id: string
    title: string
    url: string
}

interface ImportantLinksProps {
    openCreateLinkModal: () => void
}

export function ImportantLinks({openCreateLinkModal} : ImportantLinksProps) {

    const { tripId } = useParams()
    const [links, setLinks] = useState<Link[]>([
    ])

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => 
            setLinks(response.data.links))
    }, [tripId])


    return(
        <div className="space-y-6">
        <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">
            {links.map((link) => {
                return(
                    <div key={link.id} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                            <span className="block font-medium text-zinc-100">{link.title}</span>
                            <a href={link.url} target="_blank" className="block text-sm text-zinc-400 truncate hover:text-zinc-200">
                            {link.url}</a>
                        </div>
                        <Link2 className="text-zinc-400 size-5" />
                    </div>
                )
            })}
        </div>

        <Button onClick={openCreateLinkModal} variant="secondary" size="full">
            <Plus className="size-5"/>
            Cadastrar novo link
        </Button>
    </div>
    )
}