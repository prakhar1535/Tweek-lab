import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { BallSpeedTrendFilterProps, ParameterProps, Phase } from "@/types";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Img,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Stack,
  Image,
} from "@chakra-ui/react";
import { phaseParameters } from "@/lib";
// import { Scatter } from "react-chartjs-2";
// import { RangeDatepicker } from "chakra-dayzed-datepicker";

// import { phaseParameters } from "@/lib";
import { Line, Scatter } from "react-chartjs-2";
import { RangeDatepicker } from "chakra-dayzed-datepicker";


type Props = {
  data?: {
    x: number;
    y: number;
  }[];
};

export function BallSpeedTrendsScatter({ data }: Props) {
  //these are the filter options---------------------------------------------------------------

  const [filterOptions, setFilterOptions] = useState<BallSpeedTrendFilterProps>(
    {
      startDate: new Date("2021-01-01"),
      endDate: new Date(),
      action: {
        hipDominant: true,
        kneeDominant: true,
        inBetweener: true,
      },
      ageRange: {
        min: 18,
        max: 50,
      },
      ballSpeedRange: {
        min: 100,
        max: 200,
      },
      handedness: {
        right: true,
        left: true,
      },
      heightRange: {
        min: 140,
        max: 200,
      },
      weightRange: {
        min: 40,
        max: 100,
      },
    }
  );

  // dropdown menu--------------------------------------------------------------------------------------------------------------------

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  let person = null;
  if (isVisible) {
    person = (
      <div>
        {/* box */}

        <Box
          maxW="sm"
          w="full"
          px="6"
          py="4"
          boxShadow="lg"
          rounded="lg"
          bg="white"
          overflow="hidden"
        >
          {/* box */}

          <FormControl style={{ zIndex: "10" }}>
            <Heading fontSize="md" fontWeight="medium">
              Date
            </Heading>
            <Stack py="2">
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
              Height
            </Heading>
            <RangeSlider
              aria-label={["min", "max"]}
              colorScheme="brand"
              defaultValue={[
                filterOptions.heightRange.min,
                filterOptions.heightRange.max,
              ]}
              onChange={(values) => {
                setFilterOptions({
                  ...filterOptions,
                  heightRange: {
                    min: values[0],
                    max: values[1],
                  },
                });
              }}
              min={140}
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
              Weight
            </Heading>
            <RangeSlider
              aria-label={["min", "max"]}
              colorScheme="brand"
              defaultValue={[
                filterOptions.weightRange.min,
                filterOptions.weightRange.max,
              ]}
              onChange={(values) => {
                setFilterOptions({
                  ...filterOptions,
                  weightRange: {
                    min: values[0] as number,
                    max: values[1] as number,
                  },
                });
              }}
              min={40}
              max={100}
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
              Age
            </Heading>
            <RangeSlider
              aria-label={["min", "max"]}
              colorScheme="brand"
              defaultValue={[
                filterOptions.ageRange.min,
                filterOptions.ageRange.max,
              ]}
              onChange={(values) => {
                setFilterOptions({
                  ...filterOptions,
                  ageRange: {
                    min: values[0],
                    max: values[1],
                  },
                });
              }}
              min={18}
              max={50}
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
              Action
            </Heading>
            <Stack py="2">
              {Object.keys(filterOptions.action).map((option) => (
                <Checkbox
                  colorScheme="brand"
                  defaultChecked
                  key={option}
                  // @ts-ignore
                  checked={filterOptions.action[option] as boolean}
                  textTransform="capitalize"
                >
                  {option.split(/(?=[A-Z])/).join(" ")}
                </Checkbox>
              ))}
            </Stack>
          </FormControl>
          <FormControl>
            <Heading fontSize="md" fontWeight="medium">
              Handedness
            </Heading>
            <Stack py="2">
              {Object.keys(filterOptions.handedness).map((option) => (
                <Checkbox
                  key={option}
                  colorScheme="brand"
                  defaultChecked
                  // @ts-ignore
                  checked={filterOptions.handedness[option] as boolean}
                  textTransform="capitalize"
                >
                  {option}
                </Checkbox>
              ))}
            </Stack>
          </FormControl>
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
        </Box>
      </div>
    );
  } // dropdown--------------------------------------------------------------------------------------------------------------------

  // image iteration-------------------------------------------------------------------------------------------------------------

  const [selectedParameter, setSelectedParameter] = useState<ParameterProps>();

  // image iteration-------------------------------------------------------------------------------------------------------------

  const [phase, setPhase] = useState<Phase>("jump");
  //phase filter value------------------------------------------------
  const [parameter, setParameter] = useState<ParameterProps>();

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          // text: {'Sessions'},
        },
      },
      x: {
        title: { text: "sessions" },
      },
    },
  };

  const graphData = {
    datasets: [
      {
        label: "A dataset",
        data: Boolean(data)
          ? data
          : Array.from({ length: 100 }, () => ({
              x: faker.datatype.number({ min: -100, max: 100 }),
              y: faker.datatype.number({ min: -100, max: 100 }),
            })),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  const [infoGraphicShow,setinfoGraphicShow]=useState(true)
  const infoGraphicChangeHandler=()=>{
    setinfoGraphicShow(!infoGraphicShow)
  }

  return (
    <Flex direction="row" bg="white" mt="6" p="10" borderRadius="8">
      {/* commented code--------------------------------------------------------------------------------------------------------- */}

      {/* new code=============================================================================================================== */}

      <Box position="relative" width={"8xl"} mr="3"> 
      {/* this box contains both the filters and the chart------------------------------------------------------ */}
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
              {/* here mapping every phase param with option------------------------------- */}
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
              onChange={(e) => setParameter(e.target.value as ParameterProps)}
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

        {/* this is the scatter graph---------------------------------------------------------------------------------- */}
        <Scatter options={options} data={graphData} />

        {/* Add an img element with the source set to your image file */}
      </Box>

      {/* new code=============================================================================================================== */}

      {/* commented code--------------------------------------------------------------------------------------------------------- */}

      {/* <Box position='relative' width={'8xl'} mr='3'>
        <Flex gap={4} width='full' px='4' py='2'>
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
            <FormHelperText textAlign='center'>Phase</FormHelperText>
          </FormControl>
          <FormControl>
            <Select
              onChange={(e) => setParameter(e.target.value as ParameterProps)}
              value={parameter}
              textTransform='capitalize'
            >
              {Object.keys(phaseParameters[phase as Phase].values).map(
                (key) => (
                  <option value={key} key={key}>
                    {/* @ts-ignore */}
      {/* {phaseParameters[phase as Phase].values[key]}
                  </option>
                )
              )}
            </Select>
            <FormHelperText textAlign='center'>Parameter</FormHelperText>
          </FormControl>
        </Flex>
        <Scatter options={options} data={graphData} />
      </Box> */}

      {/* commented code--------------------------------------------------------------------------------------------------------- */}

      {/* Filter CODE------------------------------------------------------------------------------- */}

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
                infoGraphicChangeHandler();
                
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

        {/* filter show hide button ------------------------------------------------------------------------------------------------- */}

        {/* this is filter  */}
        {/* rendering the filter(options) after filter button */}
        {person}

         {/* jump foot contact and stride speed================================================================================== */}
         {phase === "jump" && parameter === "strideSpeed" && (
          <div>
            <Image
              src='/images/jump/stride speed.png'
              alt="jump"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              STRIDE SPEED:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              Stride Speed is measured in meters/second during the back foot
              contact stride. It decreases as one reaches back foot contact. The
              best bowlers exhibit less decrease in stride speed which is
              greater than 5 meters/sec.
            </h3>
          </div>
        )}
        {/* jump contact and stride speed================================================================================*/}

        {/* jump and forward bend================================================================================== */}
        {phase === "jump" && parameter === "forwardBend" && (
          <div>
            <Image
              src= '/images/jump/fb.png'
              alt="jump"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              FORWARD BEND:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              The forward bend represents the spine orientation (angle from the
              normal) from the side-view. It is measured in degrees. Most of the
              international fast bowlers who bowl regularly over 140 km/hr.
            </h3>
          </div>
        )}
        {/* jump and forward bend================================================================================== */}

        {/* jump and ground contact time================================================================================== */}
        {phase === "jump" && parameter === "groundContactTime" && (
          <div>
            <Image
              src='/images/jump/gct.png'
              alt="gct"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              GROUND CONTACT TIME:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              Ground contact time (GCT) of each stride during the run-up in
              milliseconds. GCT is the measurement of the amount of time you are
              in contact with the ground during strides when running, from
              foot-strike to toe-off. At the jump phase elite fast bowlers have
              GCT value less than 180 milliseconds.
            </h3>
          </div>
        )}
        {/* jump and ground contact time================================================================================== */}

        {/* jump and jump time================================================================================== */}
        {phase === "jump" && parameter === "jumpTime" && (
          <div>
            <Image
              src='/images/jump/jt.png'
              alt="gct"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              JUMP TIME:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              Jump time is measured in milliseconds and is calculated from the
              moment the front foot toe leaves the ground to the moment the back
              foot lands at the crease. It is said that one should do a forward
              jump instead of a vertical jump, as it helps transfer momentum
              towards the batter.
            </h3>
          </div>
        )}
        {/* jump and jump time================================================================================== */}

        {/* Runup and max speed================================================================================== */}
        {phase === "runUp" && parameter === "maximumRunUpSpeed" && (
          <div>
            <Image
              src='/images/runup/maxrunspeed.png'
              alt="gct"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              MAXIMUM RUN UP SPEED:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              Max Run up Speed: The maximum speed achieved during the run-up is
              called the max run-up speed. In an ideal case, the bowler should
              achieve this speed at the last step before going to the jumping
              stride and the value should be greater than 6 meters per second.
            </h3>
          </div>
        )}
        {/* Runup and max speed================================================================================== */}

        {/* Runup and last stride speed================================================================================== */}
        {phase === "runUp" && parameter === "strideSpeedAtLastStep" && (
          <div>
            <Image
              src='/images/runup/lastspeed.png'
              alt="gct"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              STRIDE SPEED AT LAST STEP:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              Stride speed at the last step of the run-up just before the jump.
              It is measured in meters/sec. Bowler will decelerate as he goes
              into the jump phase, so this step should be the fastest among all
              the steps in the run-up and should be at least 6 meters/sec
            </h3>
          </div>
        )}
        {/* Runup and last stride speed================================================================================== */}

        {/* backfootcontact and strideSpeed================================================================================== */}
        {phase === "backFootContact" && parameter === "strideSpeed" && (
          <div>
            <Image
              src='/images/backfootcontact/stride speed.png'
              alt="jump"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              FORWARD BEND:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              The forward bend represents the spine orientation (angle from the
              normal) from the side-view. It is measured in degrees. Most of the
              international fast bowlers who bowl regularly over 140 km/hr.
            </h3>
          </div>
        )}
        {/* backfootcontact and strideSpeed================================================================================== */}

        {/* backfootcontact and groundContactTime================================================================================== */}
        {phase === "backFootContact" && parameter === "groundContactTime" && (
          <div>
            <Image
              src='/images/backfootcontact/gct.png'
              alt="jump"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              FORWARD BEND:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              The forward bend represents the spine orientation (angle from the
              normal) from the side-view. It is measured in degrees. Most of the
              international fast bowlers who bowl regularly over 140 km/hr.
            </h3>
          </div>
        )}
        {/* backfootcontact and groundContactTime================================================================================== */}

        {/* backfootcontact and hipShoulderSeparation================================================================================== */}
        {phase === "backFootContact" &&
          parameter === "hipShoulderSeparation" && (
            <div>
              <Image
                src='/images/backfootcontact/hss.png'
                alt="jump"
                width="600px"
                height="200px"
                zIndex="-999"
              />
              <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
                FORWARD BEND:
              </h1>
              <h3 style={{ textAlign: "center" }}>
                The forward bend represents the spine orientation (angle from
                the normal) from the side-view. It is measured in degrees. Most
                of the international fast bowlers who bowl regularly over 140
                km/hr.
              </h3>
            </div>
          )}
        {/* backfootcontact and strideSpeed================================================================================== */}

        {/* backfootcontact and forwardBend================================================================================== */}
        {phase === "backFootContact" && parameter === "forwardBend" && (
          <div>
            <Image
              src='/images/backfootcontact/fb.png'
              alt="jump"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              FORWARD BEND:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              The forward bend represents the spine orientation (angle from the
              normal) from the side-view. It is measured in degrees. Most of the
              international fast bowlers who bowl regularly over 140 km/hr.
            </h3>
          </div>
        )}
        {/* backfootcontact and forwardBend================================================================================== */}

        {/* backfootcontact and leadingArmPosition================================================================================== */}
        {phase === "backFootContact" && parameter === "leadingArmPosition" && (
          <div>
            <Image
              src='/images/backfootcontact/lap.png'
              alt="jump"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              FORWARD BEND:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              The forward bend represents the spine orientation (angle from the
              normal) from the side-view. It is measured in degrees. Most of the
              international fast bowlers who bowl regularly over 140 km/hr.
            </h3>
          </div>
        )}
        {/* backfootcontact and leadingArmPosition================================================================================== */}

        {/* backfootcontact and backfootLandingDirection================================================================================== */}
        {phase === "backFootContact" &&
          parameter === "backfootLandingDirection" && (
            <div>
              <Image
                src='/images/backfootcontact/lap.png'
                alt="jump"
                width="600px"
                height="200px"
                zIndex="-999"
              />
              <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
                FORWARD BEND:
              </h1>
              <h3 style={{ textAlign: "center" }}>
                The forward bend represents the spine orientation (angle from
                the normal) from the side-view. It is measured in degrees. Most
                of the international fast bowlers who bowl regularly over 140
                km/hr.
              </h3>
            </div>
          )}
        {/* backfootcontact and backfootLandingDirection================================================================================== */}

        {/* backfootcontact and frontThighAngle================================================================================== */}
        {phase === "backFootContact" && parameter === "frontThighAngle" && (
          <div>
            <Image
              src='/images/backfootcontact/fta.png'
              alt="jump"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              FORWARD BEND:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              The forward bend represents the spine orientation (angle from the
              normal) from the side-view. It is measured in degrees. Most of the
              international fast bowlers who bowl regularly over 140 km/hr.
            </h3>
          </div>
        )}
        {/* backfootcontact and frontThighAngle================================================================================== */}

        {/* backfootcontact and backFootKneeAngle================================================================================== */}
        {phase === "backFootContact" && parameter === "backFootKneeAngle" && (
          <div>
            <Image
              src='/images/backfootcontact/bkc.png'
              alt="jump"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              FORWARD BEND:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              The forward bend represents the spine orientation (angle from the
              normal) from the side-view. It is measured in degrees. Most of the
              international fast bowlers who bowl regularly over 140 km/hr.
            </h3>
          </div>
        )}
        {/* backfootcontact and backFootKneeAngle================================================================================== */}

        {/* backfootcontact and shinLeadAngle================================================================================== */}
        {phase === "backFootContact" && parameter === "shinLeadAngle" && (
          <div>
            <Image
              src='/images/backfootcontact/shin lead.png'
              alt="jump"
              width="600px"
              height="200px"
              zIndex="-999"
            />
            <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
              FORWARD BEND:
            </h1>
            <h3 style={{ textAlign: "center" }}>
              The forward bend represents the spine orientation (angle from the
              normal) from the side-view. It is measured in degrees. Most of the
              international fast bowlers who bowl regularly over 140 km/hr.
            </h3>
          </div>
        )}
        {/* backfootcontact and shinLeadAngle================================================================================== */}

        {/* backfootcontact and centreOfMassPosition================================================================================== */}
        {phase === "backFootContact" &&
          parameter === "centreOfMassPosition" && (
            <div>
              <Image
                src='/images/backfootcontact/fb.png'
                alt="jump"
                width="600px"
                height="200px"
                zIndex="-999"
              />
              <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
                FORWARD BEND:
              </h1>
              <h3 style={{ textAlign: "center" }}>
                The forward bend represents the spine orientation (angle from
                the normal) from the side-view. It is measured in degrees. Most
                of the international fast bowlers who bowl regularly over 140
                km/hr.
              </h3>
            </div>
          )}
        {/* backfootcontact and centreOfMassPosition================================================================================== */}

        {/* backfootcontact and backFootKneeAngleDuringFlight================================================================================== */}
        {phase === "backFootContact" &&
          parameter === "backFootKneeAngleDuringFlight" && (
            <div>
              <Image
                src='/images/backfootcontact/bkc.png'
                alt="jump"
                width="600px"
                height="200px"
                zIndex="-999"
              />
              <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
                FORWARD BEND:
              </h1>
              <h3 style={{ textAlign: "center" }}>
                The forward bend represents the spine orientation (angle from
                the normal) from the side-view. It is measured in degrees. Most
                of the international fast bowlers who bowl regularly over 140
                km/hr.
              </h3>
            </div>
          )}
        {/* backfootcontact and backFootKneeAngleDuringFlight================================================================================== */}

        {/* backfootcontact and backFootKneeCollapse================================================================================== */}
        {phase === "backFootContact" &&
          parameter === "backFootKneeCollapse" && (
            <div>
              <Image
                src='/images/backfootcontact/bkc.png'
                alt="jump"
                width="600px"
                height="200px"
                zIndex="-999"
              />
              <h1 style={{ textAlign: "center", fontWeight: "bolder " }}>
                FORWARD BEND:
              </h1>
              <h3 style={{ textAlign: "center" }}>
                The forward bend represents the spine orientation (angle from
                the normal) from the side-view. It is measured in degrees. Most
                of the international fast bowlers who bowl regularly over 140
                km/hr.
              </h3>
            </div>
          )}

        {/* image for phase and parameter change============================================================================= */}

        {/* this code is commented for collapse of filter---------------------------------------------------------------------------- */}

        {/* <FormControl>
          <Heading fontSize='md' fontWeight='medium'>
            Date
          </Heading>
          <Stack py='2'>
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
            Height
          </Heading>
          <RangeSlider
            aria-label={['min', 'max']}
            colorScheme='brand'
            defaultValue={[
              filterOptions.heightRange.min,
              filterOptions.heightRange.max,
            ]}
            onChange={(values) => {
              setFilterOptions({
                ...filterOptions,
                heightRange: {
                  min: values[0],
                  max: values[1],
                },
              });
            }}
            min={140}
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
            Weight
          </Heading>
          <RangeSlider
            aria-label={['min', 'max']}
            colorScheme='brand'
            defaultValue={[
              filterOptions.weightRange.min,
              filterOptions.weightRange.max,
            ]}
            onChange={(values) => {
              setFilterOptions({
                ...filterOptions,
                weightRange: {
                  min: values[0] as number,
                  max: values[1] as number,
                },
              });
            }}
            min={40}
            max={100}
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
            Age
          </Heading>
          <RangeSlider
            aria-label={['min', 'max']}
            colorScheme='brand'
            defaultValue={[
              filterOptions.ageRange.min,
              filterOptions.ageRange.max,
            ]}
            onChange={(values) => {
              setFilterOptions({
                ...filterOptions,
                ageRange: {
                  min: values[0],
                  max: values[1],
                },
              });
            }}
            min={18}
            max={50}
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
            Action
          </Heading>
          <Stack py='2'>
            {Object.keys(filterOptions.action).map((option) => (
              <Checkbox
                colorScheme='brand'
                defaultChecked
                key={option}
                // @ts-ignore
                checked={filterOptions.action[option] as boolean}
                textTransform='capitalize'
              >
                {option.split(/(?=[A-Z])/).join(' ')}
              </Checkbox>
            ))}
          </Stack>
        </FormControl>
        <FormControl>
          <Heading fontSize='md' fontWeight='medium'>
            Handedness
          </Heading>
          <Stack py='2'>
            {Object.keys(filterOptions.handedness).map((option) => (
              <Checkbox
                key={option}
                colorScheme='brand'
                defaultChecked
                // @ts-ignore
                checked={filterOptions.handedness[option] as boolean}
                textTransform='capitalize'
              >
                {option}
              </Checkbox>
            ))}
          </Stack>
        </FormControl>
        <Flex w='full' gap='4'>
          <Button w='full' size='sm'>
            Reset
          </Button>
          <Button
            w='full'
            size='sm'
            variant='solid'
            bg='brand.500'
            color='white'
          >
            Apply
          </Button>
        </Flex> */}

        {/* this code is commented for collapse of filter---------------------------------------------------------------------------- */}
      </form>
    </Flex>
  );
}