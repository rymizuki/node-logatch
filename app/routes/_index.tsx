import { Form } from '@remix-run/react'
import { css, sva } from '@styled-system/css/index.mjs'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { Flex, FlexItem } from '~/components/flex'
import { parseCSS } from '~/helpers/parse-css'
import { useRecordSocketStore } from '~/store/record-socket'

export default function IndexPage() {
  const { records } = useRecordSocketStore()

  const [shown, setShow] = useState<Record<string, boolean>>({})
  const handleClick = (record: (typeof records)[number]) => {
    shown[record.id] = !shown[record.id]
    setShow({ ...shown })
  }
  const handleClickClose = () => {
    setShow({})
  }

  const [filter, setFilter] = useState<{
    type: { eq: string }
    content: { contains: string }
  }>({
    type: { eq: '' },
    content: { contains: '' },
  })
  const handleSelectType = (ev: ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value
    filter.type.eq = value
    setFilter({ ...filter })
  }
  const handleChangeKeyword = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value
    filter.content.contains = value
    setFilter({ ...filter })
  }

  const handleDoubleClick = (ev: MouseEvent<HTMLPreElement>) => {
    const target = ev.currentTarget.firstChild
    if (!target) return

    const range = document.createRange()
    range.selectNodeContents(target)

    const selection = window.getSelection()
    if (!selection) return
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const narrow = (rows: typeof records) => {
    return rows.filter((row) => {
      if (filter.type.eq !== '') {
        if (filter.type.eq !== row.type) {
          return false
        }
      }
      if (filter.content.contains !== '') {
        const fragments = filter.content.contains.split(' ')
        if (fragments.length) {
          const matched = fragments.filter((fragment) =>
            row.content.includes(fragment),
          )
          if (matched.length !== fragments.length) {
            return false
          }
        }
      }
      return true
    })
  }

  const c = style()
  return (
    <div className={c.root}>
      <h1>hello</h1>

      <div>
        <Form>
          <Flex direction="row" gap="1rem">
            <FlexItem>
              <select name="type" onChange={handleSelectType}>
                <option value="">すべて</option>
                <option value="json">JSON</option>
                <option value="text">TEXT</option>
              </select>
            </FlexItem>
            <FlexItem>
              <input
                type="text"
                name="contents"
                defaultValue={filter.content.contains}
                onChange={handleChangeKeyword}
              />
            </FlexItem>
            <FlexItem>
              <button type="button" onClick={handleClickClose}>
                すべて閉じる
              </button>
            </FlexItem>
          </Flex>
        </Form>
      </div>

      <div className={c.recordList}>
        {narrow(records).map((record) => (
          <div key={record.id} className={c.recordList__item}>
            <div
              className={c.record}
              role="button"
              tabIndex={-1}
              onClick={() => handleClick(record)}
            >
              <div className={c.record__timestamp}>{record.timestamp}</div>
              <div className={c.record__content}>
                <pre>
                  {record.ansi.spans.map((span, index) => (
                    <span key={index} style={parseCSS(span.css)}>
                      {span.text}
                    </span>
                  ))}
                </pre>
              </div>
            </div>
            {shown[record.id] && (
              <div className={css({ margin: '0 0 1rem' })}>
                <Flex>
                  <FlexItem width="8rem">timestamp</FlexItem>
                  <FlexItem shrink grow>
                    {record.timestamp}
                  </FlexItem>
                </Flex>
                <Flex>
                  <FlexItem width="8rem">content</FlexItem>
                  <FlexItem shrink grow>
                    <div>
                      <pre
                        className={css({
                          userSelect: 'text',
                          padding: '0.8rem',
                          background: '#fefefe',
                          borderRadius: '0.8rem',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                        })}
                        onDoubleClick={handleDoubleClick}
                      >
                        {record.json
                          ? JSON.stringify(record.json, null, 2)
                          : record.ansi.spans.map((span) => span.text).join('')}
                      </pre>
                    </div>
                  </FlexItem>
                </Flex>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const style = sva({
  slots: [
    'root',
    'recordList',
    'recordList__item',
    'record',
    'record__timestamp',
    'record__content',
  ],
  base: {
    root: {
      fontSize: '0.8rem',
      background: '#efefef',
    },
    recordList: {},
    record: {
      display: 'flex',
    },
    record__timestamp: {
      flex: '0 0 auto',
      width: '16rem',
    },
    record__content: {
      flex: '1 1 auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textWrap: 'nowrap',
    },
  },
})
