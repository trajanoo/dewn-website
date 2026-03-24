import { defineType, defineField } from 'sanity'
export const technicalThesis = defineType({
  name: 'technicalThesis',
  title: 'Technical Thesis',
  type: 'document',
  fields: [
    defineField({ name: 'pageTitle', title: 'Título da página', type: 'string' }),
    defineField({ name: 'pageSubtitle', title: 'Subtítulo', type: 'string' }),
    defineField({ name: 'disclaimer', title: 'Disclaimer', type: 'text' }),
    defineField({
      name: 'sections',
      title: 'Seções',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Número', type: 'string' },
          { name: 'title', title: 'Título', type: 'string' },
          { name: 'body', title: 'Conteúdo', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: { select: { title: 'title', subtitle: 'number' } }
      }]
    }),
  ],
})

export default technicalThesis
