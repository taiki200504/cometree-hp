"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 mb-12 border rounded-md p-4 bg-gray-50 animate-pulse">Loading editor...</div>
})

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  if (!mounted) {
    return <div className="h-64 mb-12 border rounded-md p-4 bg-gray-50 animate-pulse">Loading editor...</div>
  }

  // Import CSS only on client side
  if (typeof window !== 'undefined') {
    require('react-quill/dist/quill.snow.css')
  }

  return (
    <div className="rich-text-editor-wrapper">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="h-64 mb-12"
      />
      <style jsx global>{`
        .rich-text-editor-wrapper .ql-editor {
          min-height: 200px;
        }
      `}</style>
    </div>
  )
}

export default RichTextEditor
