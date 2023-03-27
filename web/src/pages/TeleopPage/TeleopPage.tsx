import { useEffect, useState } from 'react'

import { createRobotClient } from '@viamrobotics/sdk'

import { MetaTags } from '@redwoodjs/web'

const TeleopPage = () => {
  const [robot, setRobot] = useState(null)
  const [resourceNames, setResourceNames] = useState([])

  useEffect(() => {
    async function main() {
      const host = 'pasang-main.v2j2z9n7gc.viam.cloud'

      const iceServers = [{ urls: 'stun:global.stun.twilio.com:3478' }]

      const robot = await createRobotClient({
        host,
        credential: {
          type: 'robot-location-secret',
          payload: '3nmzblt8a1pau1yg10o3rvhvvfdv7tw1ayvfx9qb2swhmpxd',
        },
        authEntity: host,
        signalingAddress: 'https://app.viam.com:443',
        iceServers,
      })

      setRobot(robot)

      console.log('Resources:')
      const rn = await robot.resourceNames()
      console.log(rn)
      setResourceNames(rn)
    }
    main()
  }, [robot])

  return (
    <>
      <MetaTags title="Teleop" description="Teleop page" />

      <h1>Teleoperation</h1>
      {resourceNames ? (
        <ul>
          {resourceNames.map((resourceName) => {
            ;<li key={resourceName}>{resourceName}</li>
          })}
        </ul>
      ) : (
        <p>loading...</p>
      )}
    </>
  )
}

export default TeleopPage
