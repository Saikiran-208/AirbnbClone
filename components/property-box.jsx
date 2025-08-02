'use client'
import { useRouter } from 'next/navigation'
import ListingsCard from './listings-card'
import { deleteProperty } from '@/app/actions/deleteProperty'
import { toast } from 'sonner'

const PropertyBox = ({ each }) => {
    const router = useRouter()
    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await deleteProperty(each.id)
        if(res.ok){
            toast("Property deleted")
            router.refresh();
        }

    }
    return (

        <ListingsCard
            listing={each}
            showSecondaryBtn
            secondaryBtnLabel={"Delete this property"}
            onAction={handleDelete}

        />

    )
}

export default PropertyBox
