import React, { Component } from "react";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
// import "./DialogExtension.css";

interface DialogExtensionProps {
  showDialog: boolean;
  cancelClicked: () => void;
}

interface DialogExtensionState {
  isInstalled: boolean;
}

export default class DialogExtensionComponent extends Component<
  DialogExtensionProps,
  DialogExtensionState
> {
  private openviduExtensionUrl: string;

  constructor(props: DialogExtensionProps) {
    super(props);
    this.openviduExtensionUrl =
      "https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold";

    this.state = {
      isInstalled: false,
    };

    this.goToChromePage = this.goToChromePage.bind(this);
    this.onNoClick = this.onNoClick.bind(this);
    this.refreshBrowser = this.refreshBrowser.bind(this);
  }

  onNoClick() {
    this.props.cancelClicked();
  }

  goToChromePage() {
    window.open(this.openviduExtensionUrl);
    this.setState({ isInstalled: true });
  }

  refreshBrowser() {
    window.location.reload();
  }

  render() {
    return (
      <div>
        {this.props.showDialog ? (
          <div id="dialogExtension">
            <Card id="card">
              <CardContent>
                <Typography color="textSecondary">Hello</Typography>
                <Typography color="textSecondary">
                  You need to install this chrome extension and refresh the
                  browser to be able to share your screen.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.onNoClick}>
                  Cancel
                </Button>

                <Button size="small" onClick={this.goToChromePage}>
                  Install
                </Button>
                {this.state.isInstalled ? (
                  <Button size="small" onClick={this.refreshBrowser}>
                    Refresh
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          </div>
        ) : null}
      </div>
    );
  }
}
