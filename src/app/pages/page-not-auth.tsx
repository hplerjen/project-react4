import { Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const PageNotAuth = () => {
  return (
    <div
      style={{
        padding: "10px",
        textAlign: "start",
      }} >

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}>


        <Card className="card">
          <CardContent>
            <Typography className="cardTitel">
              You are not authorized to view this page
            </Typography>
          </CardContent>
        </Card>


      </Box>
    </div>
  )
}
