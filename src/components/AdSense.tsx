import Script from "next/script";

export function AdSenseComponent() {
  return <Script async={true} src={process.env.AD_SENSE_URL} crossOrigin="anonymous" />;
}
