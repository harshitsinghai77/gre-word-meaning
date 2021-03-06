/** @jsxRuntime classic */
/** @jsx jsx */
import {
  jsx,
  Box,
  Container,
  Heading,
  Text,
  Image,
  Label,
  Button,
} from "theme-ui";
import { TailSpin } from "react-loader-spinner";
import { useState, useEffect } from "react";
import Input from "components/input";
import banner from "assets/images/banner.png";
import { rgba } from "polished";
import axios from "axios";

const queryOpts = { name: "clipboard-read", allowWithoutGesture: false };

const Banner = () => {
  const [clipboardText, setClipboardText] = useState();
  const [alreadyGranted, setAlreadyGranted] = useState();
  const [wordMeaning, setWordMeaning] = useState();
  const [wordInput, setWordInput] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const getPermission = async () => {
    const permissionStatus = await navigator.permissions.query(queryOpts);
    if (permissionStatus.state === "granted") {
      setAlreadyGranted(true);
    }
  };

  const getMeaning = async (word) => {
    if (!word) return;
    setLoader(true);
    try {
      const meaning = await axios.post(`/api/meaning`, {
        term: word,
      });
      const wordMeaning = meaning.data.meaning[0].meaning;
      if (error) setError(false);
      setWordMeaning(wordMeaning);
    } catch {
      setError(true);
      setWordMeaning("");
    } finally {
      setLoader(false);
    }
  };

  const writtenWord = async () => {
    if (!wordInput) return;
    setClipboardText(wordInput);
    await getMeaning(wordInput);
    setWordInput("");
  };

  const onHoverDivClipboard = async () => {
    if (!alreadyGranted) {
      await getPermission();
    }
    if (navigator.clipboard) {
      const currentClipboardText = await navigator.clipboard.readText();
      if (clipboardText !== currentClipboardText) {
        getMeaning(currentClipboardText);
      }
      setClipboardText(currentClipboardText);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await writtenWord();
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  return (
    <Box as="section" id="home" sx={styles.section}>
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.content} onMouseEnter={onHoverDivClipboard}>
            <Heading as="h1">{clipboardText}</Heading>
            <TailSpin color="#00BFFF" height={40} visible={loader} />
            {!wordMeaning && !error && (
              <Box>
                <Text sx={styles.titleHeading}>
                  Copy a word and hover here...
                </Text>
                <Text as="p">
                  We will automatically detect the word and find it's meaning...
                </Text>
              </Box>
            )}
            {error && (
              <Box>
                <Text sx={styles.titleHeading}>
                  Cannot find the meaning of the word
                </Text>
                <Text as="p">Try another word...</Text>
              </Box>
            )}
            {wordMeaning &&
              Object.keys(wordMeaning).map(
                (el) =>
                  wordMeaning[el] && (
                    <Box>
                      {el}:
                      {wordMeaning[el].map((el) => (
                        <Box>
                          <Text sx={styles.titleHeading}>{el.definition}</Text>
                          <Text as="p">Example: {el.example}</Text>
                        </Box>
                      ))}
                      &nbsp;
                    </Box>
                  )
              )}
            <Box sx={styles.subscribe}>
              <Label htmlFor="text" variant="styles.srOnly">
                Enter your word here
              </Label>
              <Input
                id="word"
                type="text"
                placeholder="Enter your word here"
                onChange={(e) => setWordInput(e.target.value)}
                value={wordInput}
                onKeyDown={handleKeyDown}
              />
              <Button variant="primary" onClick={writtenWord}>
                Meaning
              </Button>
            </Box>
          </Box>
          <Box as="figure" sx={styles.illustration}>
            <Image src={banner} alt="banner" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  contentWrapper: {
    display: ["block", null, null, null, "grid", "flex"],
    gridTemplateColumns: ["1fr 1fr", null, null, null, "0.9fr 1.1fr"],
    gap: [0, 0, 0, 0, 40],
    alignItems: "center",
    minHeight: [null, null, "100vh", "70vh", "50vh", "100vh"],
    pt: ["100px", null, null, "130px", "25px", null, 0],
    textAlign: ["center", null, "left"],
  },
  content: {
    minWidth: "50%",
    maxWidth: [null, null, null, "75%", "100%"],
    margin: [null, null, null, "0 auto", 0],
    textAlign: [null, null, null, "center", "left"],
    h1: {
      color: "textSecondary",
      fontFamily: "Crimson Text, Serif",
      fontWeight: 600,
      fontSize: ["34px", "34px", "34px", "44px", "40px", "49px", "62px"],
      lineHeight: [1.26, 1.26, 1.11, 1.4, 1.11],
    },
    p: {
      maxWidth: [450, null, null, "none", 450],
      fontSize: ["14px", null, "18px", 17, "16px", "15px", "18px"],
      lineHeight: [1.87, 1.87, 2.33, 2.33, 2],
      mt: ["25px", null, null, null, 4],
    },
  },
  subscribe: {
    display: "flex",
    alignItems: "center",
    mt: ["30px"],
    input: {
      mr: ["15px"],
      minHeight: ["45px", null, null, 60, 50, null, 60],
    },
    button: {
      minHeight: ["45px", null, null, 60, 50, null, 60],
      fontSize: ["14px", "14px", "16px"],
    },
  },
  sponsoredBy: {
    display: "flex",
    alignItems: "center",
    justifyContent: ["center", null, null, null, "unset"],
    mt: ["30px", "30px", "40px", "40px", "30px"],
    span: {
      color: rgba("#566272", 0.6),
      fontSize: ["14px", "16px", "16px"],
    },
  },
  logos: {
    display: "flex",
    alignItems: "center",
    figure: {
      ml: ["10px", "16px", "28px", "16px", "16px"],
    },
    img: {
      maxWidth: ["69px", "85px", "100%", "100%", "79px", "100px", "100%"],
    },
  },
  illustration: {
    ml: [0, 0, "30px", 0, 0],
    mt: ["50px", null, null, null, 0],
    minWidth: ["auto", null, null, null, null, "600px"],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    img: {
      maxWidth: ["100%", null, null, "80%", "100%"],
    },
  },
  titleHeading: {
    fontSize: "28px",
  },
};
