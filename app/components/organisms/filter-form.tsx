import { Form } from '@remix-run/react'
import { ChangeEvent, useState } from 'react'
import { FilterPort } from '~/interfaces'
import { Flex, FlexItem } from '../flex'
import { sva } from '@styled-system/css/sva.mjs'
import { Button } from '../molecules/button'

type Props = {
  filter: FilterPort
  onChangeFilter: (filter: FilterPort) => void
  onClickClose: () => void
  onClickClear: () => void
}

export const FilterForm = ({
  filter: inputFilter,
  onChangeFilter,
  onClickClose,
  onClickClear,
}: Props) => {
  const [filter, setFilter] = useState<{
    type: { eq: string }
    content: { contains: string }
  }>(inputFilter)
  const handleSelectType = (ev: ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value
    filter.type.eq = value
    setFilter({ ...filter })
    onChangeFilter(filter)
  }
  const handleChangeKeyword = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value
    filter.content.contains = value
    setFilter({ ...filter })
    onChangeFilter(filter)
  }

  const c = style({})
  return (
    <Form>
      <Flex direction="row" gap="1rem">
        <FlexItem>
          <select
            className={c.input}
            name="type"
            defaultValue={filter.type.eq}
            onChange={handleSelectType}
          >
            <option value="">すべて</option>
            <option value="json">JSON</option>
            <option value="text">TEXT</option>
          </select>
        </FlexItem>
        <FlexItem>
          <input
            className={c.input}
            type="text"
            name="filter.content.contains"
            defaultValue={filter.content.contains}
            onChange={handleChangeKeyword}
          />
        </FlexItem>
        <FlexItem>
          <Button type="button" onClick={onClickClose}>
            すべて閉じる
          </Button>
        </FlexItem>
        <FlexItem>
          <Button type="button" onClick={onClickClear}>
            ログをクリア
          </Button>
        </FlexItem>
      </Flex>
    </Form>
  )
}

const style = sva({
  slots: ['input'],
  base: {
    input: {
      minHeight: '1.8rem',
      padding: '0.2rem 0.4rem',
      border: '1px solid #C0C0C0',
      borderRadius: '0.4rem',
      background: '#FFFAFA',
    },
  },
})
