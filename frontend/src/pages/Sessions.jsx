import React from "react";
import { LogIn, LogOut, Monitor, Smartphone, Globe, Clock } from "lucide-react";

const sessionHistory = [
  {
    action: "login",
    timestamp: "2025-03-03T13:12:49.174Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c5aad175fd5957a30023ff",
  },
  {
    action: "login",
    timestamp: "2025-03-03T13:16:49.339Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c5abc175fd5957a3002403",
  },
  {
    action: "login",
    timestamp: "2025-03-03T13:20:49.391Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c5acb18bedd15e21e4b1a3",
  },
  {
    action: "login",
    timestamp: "2025-03-03T13:22:33.657Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c5ad1932e85550ebde8820",
  },
  {
    action: "login",
    timestamp: "2025-03-03T13:23:51.087Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c5ad67e64cea123880af13",
  },
  {
    action: "login",
    timestamp: "2025-03-03T13:26:18.875Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c5adfaa51b1e19fa657c24",
  },
  {
    action: "logout",
    timestamp: "2025-03-03T13:37:01.376Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    _id: "67c5b07dff7388e6a832a6c5",
  },
  {
    action: "login",
    timestamp: "2025-03-03T13:37:13.443Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c5b089ff7388e6a832a6d5",
  },
  {
    action: "login",
    timestamp: "2025-03-03T15:28:42.038Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c5caaaf23cde3e21117706",
  },
  {
    action: "login",
    timestamp: "2025-03-05T04:00:03.714Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c7cc4389578bbb5bd2a14f",
  },
  {
    action: "login",
    timestamp: "2025-03-05T04:00:44.911Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c7cc6c89578bbb5bd2a15c",
  },
  {
    action: "login",
    timestamp: "2025-03-06T04:34:05.553Z",
    userAgent: "PostmanRuntime/7.43.0",
    ip: "::1",
    device: "unknown",
    _id: "67c925bdff82ffdf1a1b06bf",
  },
];

const Sessions = () => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionIcon = (action) => {
    switch (action) {
      case "login":
        return <LogIn className="w-5 h-5 text-green-500" />;
      case "logout":
        return <LogOut className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getDeviceIcon = (userAgent) => {
    if (userAgent.includes("Mobile")) {
      return <Smartphone className="w-5 h-5" />;
    }
    return <Monitor className="w-5 h-5" />;
  };

  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7 mb-8">
          Login History
        </h2>

        <div className="space-y-4">
          {sessionHistory.map((session) => (
            <div
              key={session._id}
              className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60"
            >
              <div className="flex items-center gap-4">
                {/* Action Icon */}
                <div className="p-2 bg-level-2 rounded-lg border-2 border-dashed border-level-4">
                  {getActionIcon(session.action)}
                </div>

                {/* Session Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-level-5 capitalize">
                      {session.action}
                    </span>
                    <span className="text-level-5/50">•</span>
                    <div className="flex items-center gap-1 text-level-5/70">
                      <Clock className="w-4 h-4" />
                      {formatDate(session.timestamp)}
                    </div>
                  </div>

                  {/* Device & Location Info */}
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center gap-4 text-level-5/70">
                      <div className="flex items-center gap-1">
                        {getDeviceIcon(session.userAgent)}
                        <span>{session.device || "Desktop"}</span>
                      </div>
                      <span className="text-level-5/30">|</span>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>{session.ip}</span>
                      </div>
                    </div>
                    <div className="text-sm text-level-5/60">
                      {session.userAgent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sessionHistory.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-level-5 mb-2">
              No Login History
            </h3>
            <p className="text-level-5/70">
              Your login history will appear here once you start using your
              account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;
