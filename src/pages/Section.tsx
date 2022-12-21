import { Toolbar, Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SectionList from '../components/a-old/section/SectionList';
import { BoxStyle, ToolbarStyle } from '../styles/style';

const Section: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Toolbar variant="dense" sx={ToolbarStyle}>
        <Typography variant="h5">Danh sách các website</Typography>
        <Button variant="contained" onClick={() => history.push('/section/create')}>
          {' '}
          Tạo Mới{' '}
        </Button>
      </Toolbar>
      <Box sx={{ m: 3 }}>
        <Box sx={{ mt: 2 }} style={BoxStyle}>
          <SectionList />
        </Box>
      </Box>
    </div>
  );
};

export default Section;
