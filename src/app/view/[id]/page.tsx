interface Props {
  params: {
    id: number
  }
}

export default function ViewId({ params }: Props) {
  return (
    <div className="p-6">
      <p>Hola! Esta es la vista {params.id}</p>
    </div>
  )
}
