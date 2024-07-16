"use client"

import React from 'react'

type Props = {
    uniqueId: string
}

const DisplatAllRecipies = ({uniqueId}: Props) => {
  return (
    <div>{uniqueId}</div>
  )
}

export default DisplatAllRecipies
