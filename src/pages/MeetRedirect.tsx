import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { isValidGoogleMeetLink } from "@/lib/utils";
import Layout from "@/components/Layout";

const DEFAULT_MEET_URL = "https://meet.google.com/kwo-xsia-poo";

export const MeetRedirect = () => {
  const [searchParams] = useSearchParams();
  const meetLink = searchParams.get("link");

  useEffect(() => {
    if (!meetLink) {
      window.location.replace(DEFAULT_MEET_URL);
      return;
    }

    if (isValidGoogleMeetLink(meetLink)) {
      window.location.replace(meetLink);
    }
  }, [meetLink]);

  if (meetLink && !isValidGoogleMeetLink(meetLink)) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen bg-background">
          <div className="text-center p-8 max-w-2xl">
            <h1 className="text-4xl font-thin proto accent mb-4">
              Invalid Google Meet Link
            </h1>
            <p className="font-thin text-justify text-muted-foreground mb-6">
              The provided link is not a valid Google Meet URL. Please check the
              link and try again.
            </p>
            <a
              href={DEFAULT_MEET_URL}
              className="proto text-sm accent hover:underline font-medium"
            >
              Join Default Meeting Room →
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};
