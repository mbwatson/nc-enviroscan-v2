import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import sampleData from '@content/test-data-v2.json'

const DataContext = createContext({ })

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const [data, ] = useState(sampleData)

  const datasets = useMemo(() => [...new Set(data.map(d => d.study.dataset))], [data])

  const fetchData = async ({ pageIndex, pageSize }) => {
    await new Promise(r => setTimeout(r, 500))

    return {
      rows: data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
      pageCount: Math.ceil(data.length / pageSize),
    }
  }

  return (
    <DataContext.Provider value={{ data, datasets, fetchData }}>
      { children }
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node,
}
