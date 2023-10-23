import ComponentDataService from "@/services/component/component-service";
import ImageService from "@/services/media/media-service";

export async function getItemDetails(itemId: string, parentId: string | null = null) {
  try {
    // Get the item details
    const response = await ComponentDataService.getItem(itemId);
    const clickedItem = response.data.component;
    const rootNode = {
      id: itemId,
      parentId: parentId,
      name: clickedItem.name,
      componentNumber: clickedItem.cn,
      revision: clickedItem.revision,
      quantity: clickedItem.quantity,
      status: clickedItem.status,
      owner: clickedItem.owner,
      componentLabels: clickedItem.componentLabels,
      hash: clickedItem.hash,
      islogical: clickedItem.isLogical,
      leadtime: clickedItem.leadTime,
      makeorbuy: clickedItem.makeOrBuy,
      mass: clickedItem.mass,
      cost: clickedItem.cost,
      currency: clickedItem.costCurrency,
      buildoninstallation: clickedItem.buildOnInstallation,
      imageUrl: clickedItem.imageURL,
      children: []
    };

    if (!clickedItem.imageURL) {
      try {
        // Get the thumbnail if imageURL is not available
        const imageResponse = await ImageService.getThumbnail(itemId);
        rootNode.imageUrl = imageResponse.data.url;
      } catch (error) {
        console.error('Failed to get thumbnail: ', error);
        rootNode.imageUrl = '';
      }
    } else {
      rootNode.imageUrl = '';
    }

    // Fetch and append children data
    await fetchAndAppendChildren(rootNode);

    return rootNode;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}

async function fetchAndAppendChildren(rootNode) {
  if (!rootNode) {
    return;
  }

  try {
    const childResponse = await ComponentDataService.getChildren(rootNode.id);
    const childrenData = childResponse.data.children;

    if (childrenData && childrenData.length > 0) {
      const childNodes = await Promise.all(childrenData.map(async (child) => {
        const childNode = {
          id: child.child.id,
          parentId: rootNode.id, // Set the parentId for children
          name: child.child.name,
          componentNumber: child.child.cn,
          revision: child.child.revision,
          quantity: child.child.quantity,
          status: child.child.status,
          owner: child.child.owner,
          componentLabels: child.child.componentLabels,
          hash: child.child.hash,
          islogical: child.child.isLogical,
          leadtime: child.child.leadTime,
          makeorbuy: child.child.makeOrBuy,
          mass: child.child.mass,
          cost: child.child.cost,
          currency: child.child.costCurrency,
          buildoninstallation: child.child.buildOnInstallation,
          imageUrl: null, // Initialize imageUrl to null
          children: [] 
        };

        if (!child.child.imageURL) {
          try {
            const imageResponse = await ImageService.getThumbnail(childNode.id);
            childNode.imageUrl = imageResponse.data.url;
          } catch (error) {
            console.error('Failed to get thumbnail: ', error);
          }
        }

        // Recursively fetch and append children for this child node
        await fetchAndAppendChildren(childNode);
        return childNode;
      }));

      rootNode.children = childNodes;
    }
  } catch (error) {
    console.error('Error loading children data:', error);
  }
}

// Function to create a flat array from the hierarchical data
export function flattenData(rootNode) {
  const flatArray = [];

  function traverse(node) {
    flatArray.push(node);

    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(rootNode);
  return flatArray;
}