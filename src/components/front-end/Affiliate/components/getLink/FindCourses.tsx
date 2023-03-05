import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CourseService, {
  CourseCriteria,
  CourseRequest,
} from '../../../../../services/CourseService';
import TypeService, { TypeResponse } from '../../../../../services/TypeService';
import { Theme, useTheme } from '@mui/material/styles';
import { Course } from '../../../../backend/teachers/TeacherDetail';

const FindCourses = ({ id }) => {
  // Pagination
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  // Criteria
  const [typeId, setTypeId] = useState<string>();
  const [name, setName] = useState<string | null>();
  const [courses, setCourses] = useState<CourseRequest[]>([]);
  const [category, setCategory] = useState<TypeResponse[]>([]);
  const [criteria, setCriteria] = useState<CourseCriteria>({});

  useEffect(() => {
    TypeService.getAllType().then((res) => {
      if (res.data) {
        setCategory(res.data);
      }
    });
  }, []);

  useEffect(() => {
    CourseService.findCourses(criteria).then((res) => {
      if (res.data) {
        console.log(res.data);
        setCourses(res.data.content);
        setTotalPage(res.data.totalPages);
      }
    });
  }, [criteria]);

  useEffect(() => {
    const criteria1 = {
      limit: limit,
      page: page - 1,
      typeId: typeId && Number(typeId) > 0 ? typeId : null,
      name: name,
    } as CourseCriteria;
    setCriteria(criteria1);
  }, [limit, page]);

  useEffect(() => {
    const criteria1 = {
      limit: limit,
      page: 0,
      typeId: typeId && Number(typeId) > 0 ? typeId : null,
      name: name,
    } as CourseCriteria;
    setCriteria(criteria1);
  }, [typeId, name]);

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeId(event.target.value);
  };

  console.log(typeId, criteria);

  // const handleSearch = async () => {
  //   const criteri = {
  //     limit: limit,
  //     page: page - 1,
  //     typeId: typeId && Number(typeId) > 0 ? typeId : null,
  //     name: name,
  //   } as CourseCriteria;
  //   await CourseService.findCourses(criteri).then((res) => {
  //     if (res.data) {
  //       setCourses(res.data.content);
  //       setTotalPage(res.data.totalPages);
  //     }
  //   });
  // };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleGetLink = () => {

  }

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} margin={1} padding={2}>
        <TextField
          value={name}
          placeholder="Nhập tên khóa học..."
          onChange={handleNameInput}
        ></TextField>
        <FormControl sx={{ marginLeft: 2, width: '300px' }}>
          <InputLabel id="demo-simple-select-label">Loại khóa học</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeId}
            label="Loại khóa học"
            onChange={handleTypeChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
            }}
          >
            <MenuItem value={``}>-----</MenuItem>
            {category.map((item) => {
              return (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* <Button sx={{ marginLeft: 2 }} onClick={handleSearch} variant={'outlined'}>
          Tìm kiếm
        </Button> */}
      </Box>
      <Box>
        <Box>
          {courses.map((course) => {
            return (
              <Box
                padding={1}
                display="flex"
                justifyContent={'space-between'}
                margin={0.5}
                border={1}
                key={course.id}
              >
                <Box display="flex">
                  <Box
                    component={'img'}
                    src={course.cover}
                    sx={{ width: '100px', heigh: '50px' }}
                    alt=""
                  ></Box>
                  <Box>
                    <Typography>{course.name}</Typography>
                    <Typography>{course.price}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography>{course.rating}</Typography>
                  <Typography>{course.ratingCount}</Typography>
                  <Button variant="contained" onClick={handleGetLink}>Lấy link</Button>
                </Box>
                {/* <Typography>{course.}</Typography> */}
              </Box>
            );
          })}
        </Box>
        <Pagination
          count={totalPage}
          page={page}
          onChange={handlePageChange}
        ></Pagination>
      </Box>
    </Box>
  );
};

export default FindCourses;
