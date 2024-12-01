import { Tabs } from './Tabs.js'
import { TabList } from './TabList.js'
import { TabButton } from './TabButton.js'
import { TabPanel } from './TabPanel.js'

// Register custom elements
customElements.define('ash-tabs', Tabs)
customElements.define('ash-tablist', TabList)
customElements.define('ash-tab', TabButton)
customElements.define('ash-tabpanel', TabPanel)

export { Tabs, TabList, TabButton, TabPanel }
