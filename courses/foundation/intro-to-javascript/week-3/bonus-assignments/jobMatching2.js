function matchEquity(candidate, job) {
    if (candidate.desiresEquity && job.equityMax > 0) {
        return true
    } else if (!candidate.desiresEquity) {
        return true
    } else {
        return false
    }
}

function matchLocation(candidate, job) {
    const locations = [...candidate.desiredLocations,candidate.currentLocation];
    for (let i = 0; i < locations.length; i++) {
        if (job.locations.includes(locations[i])) return true
    }
    return false
}

function match(job, candidates) {
    const matches = [];
    for (let i = 0; i < candidates.length; i++) {
        if (matchEquity(candidates[i], job)
            && matchLocation(candidates[i], job)) {
            matches.push(candidates[i]);
        }
    }
    return matches
}