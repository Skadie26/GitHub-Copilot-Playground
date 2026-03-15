resource symbolicname 'Microsoft.Compute/galleries@2024-03-03' = {
  scope: resourceSymbolicName or scope
  identity: {
    type: 'string'
    userAssignedIdentities: {
      {customized property}: {}
    }
  }
  location: 'string'
  name: 'string'
  properties: {
    description: 'string'
    identifier: {}
    sharingProfile: {
      communityGalleryInfo: {
        eula: 'string'
        publicNamePrefix: 'string'
        publisherContact: 'string'
        publisherUri: 'string'
      }
      permissions: 'string'
    }
    softDeletePolicy: {
      isSoftDeleteEnabled: bool
    }
  }
  tags: {
    {customized property}: 'string'
  }
}