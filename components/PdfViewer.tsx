import React from "react"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"

type Props = {
  url: string
}

export default function PdfViewer(props: Props) {
  return (
    <Document file={props.url}>
      <Page pageNumber={1} scale={2} />
    </Document>
  )
}
