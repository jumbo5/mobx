import { IndexPage, IndexPageProps } from '@views'
import axios from 'axios'
import { NextPage } from 'next'
import { GenerateBoardResponse } from 'src/views/IndexPage/model'

const Index: NextPage<IndexPageProps> = (props) => <IndexPage {...props} />

Index.getInitialProps = async () => {
  const initialBoard = await axios.get<GenerateBoardResponse>(
    `${process.env.NEXT_PUBLIC_SUDOKU_API}/board?difficulty=easy`,
  )

  return {
    initialBoard: initialBoard.data.board,
    // initialBoard: [
    //   [3, 1, 6, 5, 7, 8, 4, 9, 2],
    //   [5, 2, 9, 1, 3, 4, 7, 6, 8],
    //   [4, 8, 7, 6, 2, 9, 5, 3, 1],
    //   [2, 6, 3, 4, 1, 5, 9, 8, 7],
    //   [9, 7, 4, 8, 6, 3, 1, 2, 5],
    //   [8, 5, 1, 7, 9, 2, 6, 4, 3],
    //   [1, 3, 8, 9, 4, 7, 2, 5, 6],
    //   [6, 9, 2, 3, 5, 1, 8, 7, 4],
    //   [7, 4, 5, 2, 8, 6, 3, 1, 9],
    // ],
  }
}

export default Index
