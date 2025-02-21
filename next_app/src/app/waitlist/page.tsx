import Script from "next/script";

const cssLoader = `
let head = document.getElementsByTagName('HEAD')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css';
head.appendChild(link);
`;

export default function Waitlist() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 text-white">
      <div>
        <Script
          id="waitlist"
          type=""
          dangerouslySetInnerHTML={{ __html: cssLoader }}
        ></Script>

        <Script src="https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js"></Script>

        <div
          id="getWaitlistContainer"
          data-waitlist_id="25421"
          data-widget_type="WIDGET_1"
        ></div>
      </div>
    </div>
  );
}
