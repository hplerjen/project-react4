/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../state/root-store';

export const Orders =  observer(() => {
  const store = useRootStore();
  

  return (
    <div
    style={{
      padding: "10px",
      textAlign: "start",
    }}
  >
    <Typography variant="h6">Orders</Typography>

          </div>
  )
}
)