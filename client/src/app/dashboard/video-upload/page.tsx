'use client';

import { Button, TextField } from '@mui/material';
import { Container, Stack } from '@mui/system';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';

function VideoUploadForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('videoName', data.videoName);
    formData.append('video', data.videoFile);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="videoName"
            control={control}
            defaultValue=""
            rules={{ required: 'Video name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Video Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={Boolean(errors.videoName)}
                helperText={errors.videoName ? errors.videoName.message : ''}
              />
            )}
          />

          <Controller
            name="videoFile"
            control={control}
            defaultValue=""
            rules={{ required: 'Video file is required' }}
            render={({ field: { ref, ...rest } }) => (
              <label htmlFor="video">
                <input
                  style={{ display: 'none' }}
                  name="video"
                  accept="video/*"
                  id="video"
                  type="file"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    setValue('videoFile', file);
                  }}
                />
                <Button color="secondary" variant="contained" component="span">
                  Upload video
                </Button>
              </label>
            )}
          />
          {errors.videoFile ? <p style={{ color: 'red' }}>{errors.videoFile.message}</p> : null}

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Upload Video
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default VideoUploadForm;
