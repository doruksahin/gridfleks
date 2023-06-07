import type { Meta, StoryObj } from '@storybook/react';
import Grid from '@/components/Grid';
import GridCell from '@/components/GridCell';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Grid> = {
  title: 'Example/Grid',
  component: Grid,
  tags: [],
};

export default meta;
type Story = StoryObj<typeof Grid>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    isEditing: true,
    initialData: [{xLength: 3, yLength:4, indices: [21,22,23, 31, 32, 33, 41, 42, 43, 51, 52,53], yourCustomComponentText: "You can Drag&Drop me! --- You can create a new merged cell too!"}]
  },
  render: (args) => (<HandsomeGridContainer>
    <GridWithInitialDataAndCustomCell initialData={args.initialData} isEditing={args.isEditing}/>
    </HandsomeGridContainer>)
}

export const WithInitialDataWithCustomGridCell: Story = {
  args: {
    isEditing: true,
    initialData: [{xLength: 3, yLength:4, indices: [21,22,23, 31, 32, 33, 41, 42, 43, 51, 52,53], yourCustomComponentText: "You can inject your prop into grid data"}]
  },
  render: (args) => (<HandsomeGridContainer>
    <GridWithInitialDataAndCustomCell initialData={args.initialData} isEditing={args.isEditing}/>
    </HandsomeGridContainer>)
}


export const EmptyGrid: Story = {
  args: {
isEditing: true,
  },
  render: (args) => <HandsomeGridContainer>
    <Grid {...args}></Grid>
  </HandsomeGridContainer>
};

export const CustomGridCell: Story = {
  args: {
isEditing: true,
  },
  render: (args) => 
  <HandsomeGridContainer>
    <Grid {...args}><GridCell isEditing={args.isEditing}></GridCell></Grid>

  </HandsomeGridContainer>
};

export const WithInitialData: Story = {
  args: {
    isEditing: true,
    initialData: [{xLength: 3, yLength:4, indices: [21,22,23, 31, 32, 33, 41, 42, 43, 51, 52,53]}]
  },
  render: (args) => (<HandsomeGridContainer>
    <Grid {...args}></Grid>
    </HandsomeGridContainer>)

}


function GridWithInitialDataAndCustomCell({initialData, isEditing}){
  const [data, setData] = useState(initialData);
  return (
          <Grid initialData={data} setData={setData} isEditing={isEditing}>
      <GridCell isEditing={isEditing} data={data} setData={setData}/>
    </Grid>
    
  ) 
}

function HandsomeGridContainer({children}){
  return (
    <div className="flex h-screen items-center justify-center">
    <div className="border-4 border-black  bg-opacity-50 w-[90%] h-[90%]">
      {children}
    </div>
    </div>
    
  )
}