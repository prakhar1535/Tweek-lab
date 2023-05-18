import React, { Ref, useState } from "react";
import { faker } from "@faker-js/faker";
import { BallSpeedTrendFilterProps, ParameterProps, Phase } from "@/types";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  GridItem,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useMultiStyleConfig,
  useTab,
} from "@chakra-ui/react";
import { phaseParameters } from "@/lib";
import { Line, Scatter } from "react-chartjs-2";
import { RangeDatepicker } from "chakra-dayzed-datepicker";

type Props = {
  data?: {
    x: number;
    y: number;
  }[];
};

export function BallSpeedTrendsLine({ data }: Props) {
  const mockData = Array.from({ length: 10 }, () => ({
    x: faker.datatype.number({ min: 1, max: 100 }),
    y: faker.datatype.number({ min: 1, max: 100 }),
  })).sort((a, b) => a.x - b.x);

  const [filterOptions, setFilterOptions] = useState<any>({
    startDate: new Date("2021-01-01"),
    endDate: new Date(),
    ballSpeedRange: {
      min: 100,
      max: 200,
    },
    ballsBowledPerSessionRange: {
      min: 0,
      max: 1000,
    },
    statType: "average",
  });

  const STAT_TYPES = ["average", "maximum", "minimum", "median", "efficiency"];

  const [phase, setPhase] = useState<Phase>("jump");
  const [parameter, setParameter] = useState<ParameterProps>();
  const [chartYText, setchartYText] = useState("Stride Speed");

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sessions",
          font: {
            size: 13,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: chartYText,
          font: {
            size: 15,
          },
        },
      },
    },
  };

  const graphData = {
    labels: mockData.map((dataPoint) => dataPoint.x),
    datasets: [
      {
        label: "A dataset",
        data: Boolean(data) ? data : mockData.map((dataPoint) => dataPoint.y),
        fill: true,
        backgroundColor: "#F04E3E20",
        borderColor: "#F04E3E",
        pointBackgroundColor: "#F04E3E",
        pointHoverBorderColor: "#F04E3E",
        tension: 0.1,
      },
    ],
  };

  // dropdown--------------------------------------------------------------------------------------------------------------------

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  let person = null;
  if (isVisible) {
    person = (
      <div>
        <FormControl>
          <Heading fontSize="md" fontWeight="medium">
            Date
          </Heading>
          <Stack py="3">
            <RangeDatepicker
              selectedDates={[filterOptions.startDate, filterOptions.endDate]}
              onDateChange={(dates) => {
                setFilterOptions({
                  ...filterOptions,
                  startDate: dates[0],
                  endDate: dates[1],
                });
              }}
            />
          </Stack>
        </FormControl>
        <FormControl>
          <Heading fontSize="md" fontWeight="medium">
            Ball Speed
          </Heading>
          <RangeSlider
            aria-label={["min", "max"]}
            colorScheme="brand"
            defaultValue={[
              filterOptions.ballSpeedRange.min,
              filterOptions.ballSpeedRange.max,
            ]}
            onChange={(values) => {
              setFilterOptions({
                ...filterOptions,
                ballSpeedRange: {
                  min: values[0],
                  max: values[1],
                },
              });
            }}
            min={100}
            max={200}
            step={1}
            my="3"
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb bg="gray.100" index={0} />
            <RangeSliderThumb bg="gray.100" index={1} />
          </RangeSlider>
        </FormControl>
        <FormControl>
          <Heading fontSize="md" fontWeight="medium">
            Balls Bowled per Session
          </Heading>
          <RangeSlider
            aria-label={["min", "max"]}
            colorScheme="brand"
            defaultValue={[
              filterOptions.ballsBowledPerSessionRange.min,
              filterOptions.ballsBowledPerSessionRange.max,
            ]}
            onChange={(values) => {
              setFilterOptions({
                ...filterOptions,
                ballsBowledPerSessionRange: {
                  min: values[0],
                  max: values[1],
                },
              });
            }}
            min={0}
            max={1000}
            step={1}
            my="3"
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb bg="gray.100" index={0} />
            <RangeSliderThumb bg="gray.100" index={1} />
          </RangeSlider>
        </FormControl>
        <Tabs
          variant="unstyled"
          colorScheme="orange"
          size="sm"
          onChange={(index) =>
            setFilterOptions({
              ...filterOptions,
              statType: STAT_TYPES[index],
            })
          }

        >

        </Tabs>
        <Flex w="full" gap="4">
          <Button w="full" size="sm">
            Reset
          </Button>
          <Button
            w="full"
            size="sm"
            variant="solid"
            bg="brand.500"
            color="white"
          >
            Apply
          </Button>
        </Flex>
      </div>
    );
  }

  // dropdown--------------------------------------------------------------------------------------------------------------------

  // image iteration-------------------------------------------------------------------------------------------------------------

  // image iteration-------------------------------------------------------------------------------------------------------------

  return (
    <Flex
      mx={10}
      mb={10}
      direction="column"
      bg="white"
      borderRadius="2xl"
      p={10}
    >
      <Heading fontSize="2xl" color="gray.600" fontWeight="black" mb={5}>
        Session Analysis
      </Heading>
      <Flex direction="row">
        <Box position="relative" width={"8xl"} mr="3">
          <Flex gap={4} width="full" px="4" py="2">
            <FormControl>
              <Select
                onChange={(e) => {
                  setPhase(e.target.value as Phase);
                  setParameter(
                    // @ts-ignore
                    Object.keys(
                      phaseParameters[e.target.value as Phase].values
                    )[0]
                  );
                }}
                value={phase}
              >
                {Object.keys(phaseParameters).map((p) => (
                  <option value={p} key={p}>
                    {phaseParameters[p as keyof typeof phaseParameters].label}
                  </option>
                ))}
              </Select>
              <FormHelperText textAlign="center">Phase</FormHelperText>
            </FormControl>
            <FormControl>
              <Select
                // onChange={(e) => setParameter(e.target.value as ParameterProps)}
                onChange={(e) => {
                  setParameter(e.target.value as ParameterProps | undefined);
                }}
                value={parameter}
                textTransform="capitalize"
              >
                {Object.keys(phaseParameters[phase as Phase].values).map(
                  (key) => (
                    <option value={key} key={key}>
                      {/* @ts-ignore */}
                      {phaseParameters[phase as Phase].values[key]}
                    </option>
                  )
                )}
              </Select>
              <FormHelperText textAlign="center">Parameter</FormHelperText>
            </FormControl>
          </Flex>

          {/* <Tab>
              <TabList display='flex' flexWrap={'wrap'} gap={2} my='3'>
                {STAT_TYPES.map((statType) => (
                  <Tab
                    value={statType}
                    key={statType}
                    bg='#FF795520'
                    rounded='lg'
                    color='brand.500'
                    fontWeight='bold'
                    textTransform='capitalize'
                    _selected={{
                      bg: 'brand.500',
                      color: 'white',
                    }}
                  >
                    {statType}
                  </Tab>
                ))}
              </TabList>
              </Tab>
               */}

          <Line data={graphData} options={options} />
          <div>
            <Tabs
              variant="unstyled"
              colorScheme="orange"
              size="sm"
              onChange={(index) =>
                setFilterOptions({
                  ...filterOptions,
                  statType: STAT_TYPES[index],
                })
              }
            >
              <Heading
                fontSize="md"
                fontWeight="medium"
                style={{ marginLeft: "45%", marginTop: "20px" }}
              >
                Display Statistics
              </Heading>

              {
                <TabList
                  display="flex"
                  flexWrap={"wrap"}
                  gap={2}
                  my="4"
                  style={{ marginLeft: "25%" }}
                >
                  {STAT_TYPES.map((statType) => (
                    <Tab
                      value={statType}
                      key={statType}
                      bg="#FF795520"
                      rounded="lg"
                      color="brand.500"
                      fontWeight="bold"
                      textTransform="capitalize"
                      _selected={{
                        bg: "brand.500",
                        color: "white",
                      }}
                    >
                      {statType}
                    </Tab>
                  ))}
                </TabList>
              }
            </Tabs>
          </div>
          {/* <Tabs
              variant='unstyled'
              colorScheme='orange'
              size='sm'
              onChange={(index) =>
                setFilterOptions({
                  ...filterOptions,
                  statType: STAT_TYPES[index],
                })
              }
            >
            </Tabs>  */}
        </Box>

        <form style={{ width: "30%" }}>
        <center>
          <Flex alignItems="center" translateX="2PX">
            <Heading fontSize="xl" textAlign="center">
              Filters
            </Heading>
            {/* filter show hide button ------------------------------------------------------------------------------------------------- */}

            <Button
              w="auto"
              size="sm"
              variant=""
              color="BLACK"
              type="button"
              // onClick={toggleVisibility}
              onClick={() => {
                toggleVisibility();
                
                
              }}
              // for arrow button styling and toggling-------------------------------------------------------------------------------------

              _before={{
                content: '""',
                display: "inline-block",
                width: "0",
                height: "0",
                marginLeft: "4px",
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTopWidth: "4px",
                borderTopStyle: isVisible ? "solid" : "double",
                borderTopColor: "black",
                transform: isVisible ? "rotate(180deg)" : "none",
                transition: "transform 0.3s ease",
              }}
              // for arrow button styling and toggling-------------------------------------------------------------------------------------

              marginBottom="10px"
              marginTop="10px"
              transition="1s"
            >
              {isVisible ? "" : ""}
            </Button>
          </Flex>

          {/*the filter button and 'filter' text are in this <center>  */}
        </center>

          <Flex gap={3} direction="column" mt={3}>
            {person}

            {/* this code is commented because its already toggled by button above----------------------------------------------------- */}

            {/* <FormControl>


              <Heading fontSize='md' fontWeight='medium'>
                Date
              </Heading>
              <Stack py='3'>
                <RangeDatepicker
                  selectedDates={[
                    filterOptions.startDate,
                    filterOptions.endDate,
                  ]}
                  onDateChange={(dates) => {
                    setFilterOptions({
                      ...filterOptions,
                      startDate: dates[0],
                      endDate: dates[1],
                    });
                  }}
                />
              </Stack>
            </FormControl>
            <FormControl>
              <Heading fontSize='md' fontWeight='medium'>
                Ball Speed
              </Heading>
              <RangeSlider
                aria-label={['min', 'max']}
                colorScheme='brand'
                defaultValue={[
                  filterOptions.ballSpeedRange.min,
                  filterOptions.ballSpeedRange.max,
                ]}
                onChange={(values) => {
                  setFilterOptions({
                    ...filterOptions,
                    ballSpeedRange: {
                      min: values[0],
                      max: values[1],
                    },
                  });
                }}
                min={100}
                max={200}
                step={1}
                my='3'
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb bg='gray.100' index={0} />
                <RangeSliderThumb bg='gray.100' index={1} />
              </RangeSlider>
            </FormControl>
            <FormControl>
              <Heading fontSize='md' fontWeight='medium'>
                Balls Bowled per Session
              </Heading>
              <RangeSlider
                aria-label={['min', 'max']}
                colorScheme='brand'
                defaultValue={[
                  filterOptions.ballsBowledPerSessionRange.min,
                  filterOptions.ballsBowledPerSessionRange.max,
                ]}
                onChange={(values) => {
                  setFilterOptions({
                    ...filterOptions,
                    ballsBowledPerSessionRange: {
                      min: values[0],
                      max: values[1],
                    },
                  });
                }}
                min={0}
                max={1000}
                step={1}
                my='3'
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb bg='gray.100' index={0} />
                <RangeSliderThumb bg='gray.100' index={1} />
              </RangeSlider>
            </FormControl> */}

            {/* <Tabs
              variant='unstyled'
              colorScheme='orange'
              size='sm'
              onChange={(index) =>
                setFilterOptions({
                  ...filterOptions,
                  statType: STAT_TYPES[index],
                })
              }
            >

                Display Statistics
              </Heading>
              <TabList display='flex' flexWrap={'wrap'} gap={2} my='3'>
                {STAT_TYPES.map((statType) => (
                  <Tab
                    value={statType}
                    key={statType}
                    bg='#FF795520'
                    rounded='lg'
                    color='brand.500'
                    fontWeight='bold'
                    textTransform='capitalize'
                    _selected={{
                      bg: 'brand.500',
                      color: 'white',
                    }}
                  >
                    {statType}
                  </Tab>
                ))}
              </TabList>
            </Tabs> */}

            {/* this code is commented because its already toggled by button above----------------------------------------------------- */}
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
}
