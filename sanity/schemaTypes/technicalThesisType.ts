import { defineType, defineField } from 'sanity'

export const technicalThesis = defineType({
  name: 'technicalThesis',
  title: 'Technical Thesis',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({
      name: 'tables',
      title: 'Tables',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'table',
          title: 'Table',
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'columns', title: 'Columns', type: 'array', of: [{ type: 'string' }] },
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'row',
                  title: 'Row',
                  fields: [
                    { name: 'cells', title: 'Cells', type: 'array', of: [{ type: 'string' }] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})

export default technicalThesis
