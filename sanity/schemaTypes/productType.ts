
import { Box } from 'lucide-react'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: Box,
  fields: [
    defineField({name: 'name', type: 'string'}),
    defineField({name: 'tagline', type: 'string'}),
    defineField({name: 'image', type: 'image'}),
    defineField({name: 'gradient', type: 'string'}),
    defineField({name: 'atmosphere', type: 'string'}),
    defineField({name: 'whatItIs', type: 'text'}),
    defineField({name: 'whyItWorks', type: 'text'}),
    defineField({
      name: 'experience',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
})
