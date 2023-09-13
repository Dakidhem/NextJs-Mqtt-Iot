export default function actualPresence(presence_payload) {
  presence_payload.presenceDetected &&
  presence_payload.roomPresenceIndication > 0 &&
  presence_payload.trackerTargets.length > 0
    ? true
    : false;
}
