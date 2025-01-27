import React, { useState } from 'react'
import NewProposalForm from '../NewProposalForm'
import Breadcrumb from '../bread-crumb'

export default function CreateProposal() {
    const [, setIsOpen] = useState<boolean>(false)
  return (
    <div className='w-full'>
        <Breadcrumb page="Create Proposal" route="/create-proposal" />


        <NewProposalForm setIsModalOpen={setIsOpen} />
    </div>
  )
}
