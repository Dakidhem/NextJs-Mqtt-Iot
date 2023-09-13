import {
  BsPatchQuestionFill,
  BsPatchCheckFill,
  BsPatchExclamationFill,
  BsPatchMinusFill,
} from "react-icons/bs";
import actualPresence from "../../utils/actualPresence";
const DeviceRow = ({ device, devices }) => {
  //component for each device in each room
  const returnDeviceState = (deviceId) => {
    const device = devices.find((device) => device.id === deviceId);
    if (!device) {
      return <BsPatchQuestionFill size="16" className="mx-auto" />;
    } else {
      if (device?.data?.type === 5) {
        return (
          <BsPatchExclamationFill color="red" size="16" className="mx-auto" />
        );
      } else {
        if (actualPresence(device?.data?.payload)) {
          return (
            <BsPatchCheckFill color="green" size="16" className="mx-auto" />
          );
        } else {
          return (
            <BsPatchMinusFill color="blue" size="16" className="mx-auto" />
          );
        }
      }
    }
  };
  return (
    <tr class="bg-white hover:bg-gray-50 flex flex-col sm:table-row ">
      <td class="px-6 py-4 break-all">{device._id}</td>

      <td class="px-6 py-4 break-all">{device.serialProduct}</td>
      <td class="px-6 py-4 break-all">{returnDeviceState(device._id)}</td>
    </tr>
  );
};
export default DeviceRow;
