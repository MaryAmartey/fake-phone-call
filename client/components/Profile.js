import React from 'react';
import { ScrollView, Stack, Box, Text, FormControl, Input, Divider } from 'native-base';


const Profile= () =>{
    return <ScrollView w="100%">
      <Stack space={2.5} alignSelf="center" px="4" safeArea mt="4" w={{
      base: "100%",
      md: "25%"
    }}>
        <Box>
          <Text bold fontSize="xl" mb="4">
            Keyword
          </Text>
          <FormControl mb="5">
            <FormControl.Label>Project Title</FormControl.Label>
            <Input variant="rounded"/>
            <FormControl.HelperText>
              Give your project a title.
            </FormControl.HelperText>
          </FormControl>
          <Divider />
        </Box>
        <Box>
          <Text bold fontSize="xl" mb="4">
            Disabled
          </Text>
          <FormControl isDisabled mb="5">
            <FormControl.Label _disabled={{
            _text: {
              color: "gray.400",
              fontWeight: "bold"
            }
          }}>
              Project Title
            </FormControl.Label>
            <Input placeholder="Title" variant="rounded" />
            <FormControl.HelperText>
              Give your project a title.
            </FormControl.HelperText>
          </FormControl>
          <Divider />
        </Box>
      </Stack>
    </ScrollView>;

  }


export default Profile;
